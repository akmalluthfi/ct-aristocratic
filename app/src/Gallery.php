<?php

namespace App\Web;

use SilverStripe\Assets\Image;
use SilverStripe\Forms\TabSet;
use SilverStripe\ORM\DataObject;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TextField;
use SilverStripe\AssetAdmin\Forms\UploadField;

class Gallery extends DataObject
{
    private static $db = [
        'Name' => 'Varchar'
    ];

    private static $has_one = [
        'Picture' => Image::class
    ];

    private static $owns = [
        'Picture'
    ];

    private static $summary_fields = [
        'Picture.CMSThumbnail' => '',
        'Name' => 'Name'
    ];

    public function getCMSFields()
    {
        $fields = FieldList::create(TabSet::create('Root'));
        $fields->addFieldsToTab('Root.Main', [
            TextField::create('Name')->setDescription('Name for picture'),
            $picture = UploadField::create('Picture')
        ]);

        $picture->setFolderName('gallery')->getValidator()->setAllowedExtensions(['jpg', 'jpeg', 'png']);

        return $fields;
    }
}
