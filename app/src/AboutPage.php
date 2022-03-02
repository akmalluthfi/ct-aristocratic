<?php

namespace App\Web;

use Page;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TextareaField;
use SilverStripe\Forms\TextField;

class AboutPage extends Page
{
    private static $db = [
        'SubTitle' => 'Varchar',
        'Iframe' => 'Text'
    ];

    public function getCMSFields()
    {
        $fields = parent::getCMSFields();

        $fields->addFieldToTab('Root.Main', TextField::create('SubTitle', 'Title of content'), 'Content');
        $fields->addFieldToTab('Root.Main', TextareaField::create('Iframe')->setDescription('Iframe from youtube embed video.'), 'Content');

        return $fields;
    }
}
