<?php

namespace App\Web;

use SilverStripe\Admin\ModelAdmin;

class ServiceAdmin extends ModelAdmin
{
    private static $menu_title = 'Service';

    private static $url_segment = 'service';

    private static $managed_models = [
        Service::class
    ];
}
