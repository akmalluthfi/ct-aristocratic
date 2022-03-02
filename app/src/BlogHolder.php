<?php

namespace App\Web;

use Page;
use App\Web\PostPage;
use App\Web\PostCategory;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\GridField\GridFieldConfig_RecordEditor;

class BlogHolder extends Page
{
    private static $allowed_children = [
        PostPage::class
    ];

    private static $has_many = [
        'Categories' => PostCategory::class
    ];

    public function getCMSFields()
    {
        $fields = parent::getCMSFields();
        $fields->addFieldToTab('Root.Categories', GridField::create(
            'Categories',
            'Post Categories',
            $this->Categories(),
            GridFieldConfig_RecordEditor::create()
        ));

        return $fields;
    }
}
