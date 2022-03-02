<?php

namespace App\Web;

use SilverStripe\ORM\DataObject;

class PostComment extends DataObject
{
    private static $db = [
        'Name' => 'Varchar',
        'Email' => 'Varchar',
        'Comment' => 'Text',
        'Image' => 'Varchar'
    ];

    private static $has_one = [
        'PostPage' => PostPage::class
    ];
}
