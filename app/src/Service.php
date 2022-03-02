<?php

namespace App\Web;

use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\HTMLEditor\HTMLEditorField;
use SilverStripe\Forms\TabSet;
use SilverStripe\Forms\TextField;
use SilverStripe\ORM\DataObject;

class Service extends DataObject
{
    private static $db = [
        'Icon' => 'Varchar',
        'Title' => 'Varchar',
        'Content' => 'HTMLText'
    ];

    private static $summary_fields = [
        'Icon' => 'Icon',
        'Title' => 'Title',
        "Content.FirstSentence" => 'Content'
    ];

    public function getCMSFields()
    {
        $fields = FieldList::create(TabSet::create('Root'));
        $fields->addFieldsToTab('Root.Main', [
            TextField::create('Icon')->setDescription('Icon from font awasome, copy the code snippet'),
            TextField::create('Title')->setDescription('Name of Service'),
            HTMLEditorField::create('Content')
        ]);

        return $fields;
    }
}
