<?php

namespace App\Web;

use PageController;

class HomePageController extends PageController
{
    public function getAbout()
    {
        return AboutPage::get();
    }

    public function getServices()
    {
        return Service::get();
    }
}
