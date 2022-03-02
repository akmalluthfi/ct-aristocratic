<?php

namespace App\Web;

use Page;
use App\Web\Subscriber;
use App\Web\PostComment;
use SilverStripe\ORM\DB;
use App\Web\PostCategory;
use SilverStripe\Assets\Image;
use SilverStripe\Forms\DateField;
use SilverStripe\Security\Security;
use SilverStripe\Forms\ListboxField;
use SilverStripe\Control\Email\Email;
use SilverStripe\SiteConfig\SiteConfig;
use SilverStripe\AssetAdmin\Forms\UploadField;

class PostPage extends Page
{
    private static $can_be_root = false;

    private static $db = [
        'Writer' => 'Varchar',
        'Date' => 'Date',
        'hasSendEmail' => 'Boolean'
    ];

    private static $defaults = [
        'hasSendEmail' => 0
    ];

    private static $has_one = [
        'Thumbnail' => Image::class
    ];

    private static $owns = [
        'Thumbnail'
    ];

    private static $many_many = [
        'Categories' => PostCategory::class
    ];

    private static $has_many = [
        'Comments' => PostComment::class
    ];

    public function onBeforeWrite()
    {
        if ($member = Security::getCurrentUser()) {
            if (is_null($member->FirstName) && !is_null($member->Surname)) {
                $this->Writer = $member->FirstName . ' ' . $member->Surname;
            } else if (!is_null($member->FirstName)) {
                $this->Writer = $member->FirstName;
            } else if (!is_null($member->Surname)) {
                $this->Writer = $member->Surname;
            } else {
                $this->Writer = $member->Email;
            }
        } else {
            $this->Writer = 'default author';
        }

        parent::onBeforeWrite();
    }

    public function onBeforePublish()
    {
        if ($this->hasSendEmail === 0) {
            $this->sendEmail();
            $this->hasSendEmail = 1;
        }
    }

    private function sendEmail()
    {
        // * email notifikasi kalau ada post baru 
        // ambil semua email
        $emails = Subscriber::get();
        foreach ($emails as $userEmail) {
            // lalu kirimkan email ketiap email user 
            $email = Email::create()
                ->setHTMLTemplate('Email\\newPost')
                ->setData([
                    'Writer' => $this->Writer,
                    'Title' => $this->Title,
                    'PostLink' => $this->Link(),
                    'ID' => $userEmail->ID,
                    'Link' => BASE_URL,
                    'SiteConfig' => SiteConfig::current_site_config()
                ])->setFrom('admin@aristocratic.com', 'admin')
                ->setTo($userEmail->Email)
                ->setSubject('Here a new post');

            $email->send();
        }
    }

    public function getCMSFields()
    {
        $fields = parent::getCMSFields();

        // $fields->addFieldToTab('Root.Main', TextField::create('Writer', 'Author of post')->, 'Content');
        $fields->addFieldsToTab('Root.Main', DateField::create('Date', 'Date of post'), 'Content');

        $fields->addFieldToTab('Root.Main', $thumbnail = UploadField::create('Thumbnail'), 'Content');
        $thumbnail->setFolderName('posts-thumbnail')->getValidator()->setAllowedExtensions(['jpg', 'jpeg', 'png']);

        $fields->addFieldToTab('Root.Main', ListboxField::create(
            'Categories',
            'Selected categories',
            // $this->Parent()->Categories()->map('ID', 'Name')
            PostCategory::get()->map('ID', 'Name')
        ), 'Content');

        return $fields;
    }

    public function CategoriesList()
    {
        if ($this->Categories()->exists()) {
            return implode(', ', $this->Categories()->column('Name'));
        }

        return null;
    }

    public function getReleatedPosts()
    {
        // cari category yang dimiliki post ini
        $thisCategories = $this->Categories();

        $arr = [];
        foreach ($thisCategories as $thisCategory) {
            // jika parentID === 0, parent
            if ($thisCategory->ParentCategoryID === 0) {
                // tambahkan Id parent ke dalam array
                $arr[] = $thisCategory->ID;
                // lalu foreach untuk dapat child (subcategory) dari category

                // *jika mempunyai relasi has_many, dan relasi tersebut diberi anotasi function, maka akan mengembalikan object dari relasi has_many tersebut
                foreach ($thisCategory->SubCategories() as $SubCategory) {
                    // lalu masukkan juga ke 
                    $arr[] = $SubCategory->ID;
                }
            } else {
                // cari parentnya 
                //* jika mempunyai relasi has_one, dan relasi tersebut diberi anotasi function, maka akan mengembalikan object dari parentnya 
                $parentCategory = $thisCategory->ParentCategory();
                // lalu ambil id dari parent, masukkan dalam array
                $arr[] = $parentCategory->ID;
                // lalu ambil child (subcategory) dari parent yang sudah didapat
                foreach ($parentCategory->SubCategories() as $SubCategory) {
                    // ambil id tiap-tiap child (subcategory)
                    $arr[] = $SubCategory->ID;
                }
            }
        }

        $posts = PostPage::get()->filter([
            'ID:not' => $this->ID,
            'Categories.ID' => $arr
        ])->sort(DB::get_conn()->random())->limit(3);

        return $posts;
    }
}
