<?php

namespace App\Web;

use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TextField;
use SilverStripe\ORM\DataObject;

class Social extends DataObject
{
    private static $db = [
        'Icon' => 'Varchar',
        'Link' => 'Varchar'
    ];

    private static $summary_fields = [
        'Icon' => 'Icon',
        'Link' => 'Link'
    ];

    public function getCMSFields()
    {
        $fields = FieldList::create(
            TextField::create('Icon')->setDescription('Icon from font awasome, copy the code snippet'),
            TextField::create('Link')->setDescription('Link to the social media')
        );

        return $fields;
    }
}
