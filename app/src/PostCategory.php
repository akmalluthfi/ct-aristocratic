<?php

namespace App\Web;

use App\Web\PostPage;
use App\Web\BlogHolder;
use SilverStripe\ORM\DataObject;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TextField;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\GridField\GridFieldAddNewButton;
use SilverStripe\Forms\GridField\GridFieldConfig_RecordEditor;

class PostCategory extends DataObject
{
    private static $db = [
        'Name' => 'Varchar'
    ];

    private static $has_one = [
        'BlogHolder' => BlogHolder::class,
        'ParentCategory' => PostCategory::class
    ];

    private static $belongs_many_many = [
        'Posts' => PostPage::class,
    ];

    private static $has_many = [
        'SubCategories' => PostCategory::class
    ];

    public function getCMSFields()
    {
        if ($this->ParentCategoryID === 0) {
            $fields = FieldList::create(
                TextField::create('Name'),
                GridField::create(
                    'SubCategories',
                    'SubCategories',
                    $this->SubCategories(),
                    GridFieldConfig_RecordEditor::create()
                )
            );
        } else {
            $fields = FieldList::create(
                TextField::create('Name')
            );
        }

        return $fields;
    }

    public function Link()
    {
        // link jika menggunakan php
        // return $this->BlogHolder()->Link('category/' . $this->ID);

        // link jika menggunakan ajax 
        return $this->BlogHolder()->Link('?categoryID=' . $this->ID);
    }
}
