<?php

namespace App\Web;

use Page;
use SilverStripe\Forms\TextareaField;

class ContactPage extends Page
{
    private static $db = [
        'Map' => 'Text'
    ];

    public function getCMSFields()
    {
        $fields = parent::getCMSFields();
        $fields->addFieldToTab('Root.Main', TextareaField::create('Map')->setDescription('Copy iframe from google maps'), 'Content');

        return $fields;
    }
}
