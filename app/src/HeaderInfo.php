<?php 

namespace App\Web;

use App\Web\SiteConfigExtension;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TextField;
use SilverStripe\ORM\DataObject;

class HeaderInfo extends DataObject
{
    private static $db = [
        'Icon' => 'Varchar', 
        'Content' => 'Varchar'
    ];

    private static $summary_fields = [
        'Icon' => 'Icon', 
        'Content' => 'Content'
    ];

    public function getCMSFields()
    {
        $fields = FieldList::create(
            TextField::create('Icon')->setDescription('Icon from font awasome, copy the code snippet'), 
            TextField::create('Content')->setDescription('Content for icon')
        );

        return $fields;
    }

}