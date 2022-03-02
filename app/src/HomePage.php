<?php

namespace App\Web;

use Page;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\Image;
use SilverStripe\Forms\TextField;

class HomePage extends Page
{
    private static $db = [
        'SubTitle' => 'Varchar',
    ];

    private static $has_one = [
        'Banner' => Image::class
    ];

    public function getCMSFields()
    {
        $fields = parent::getCMSFields();

        $fields->addFieldToTab('Root.Main', TextField::create('SubTitle', 'Title of content'), 'Content');
        $fields->addFieldToTab('Root.Main', $banner = UploadField::create('Banner'), 'Content');

        $banner->setFolderName('banner-home')->getValidator()->setAllowedExtensions(['jpg', 'jpeg', 'png']);

        return $fields;
    }
}
