<?php

namespace App\Web;

use SilverStripe\ORM\DataObject;

class Subscriber extends DataObject
{
    private static $db = [
        'Email' => 'Varchar'
    ];
}
