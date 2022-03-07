<?php

namespace App\Security;

use SilverStripe\Security\Member;

class MyMember extends Member
{
    private static $db = [
        'Username' => 'Varchar',
        'Password' => 'Varchar'
    ];

    public function getCMSFields()
    {
        $fields = parent::getCMSFields();
        return $fields;
    }
}
