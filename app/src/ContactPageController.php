<?php

namespace App\Web;

use PageController;
use SilverStripe\Control\Email\Email;
use SilverStripe\Core\Environment;
use SilverStripe\SiteConfig\SiteConfig;

class ContactPageController extends PageController
{
    private static $allowed_actions = [
        'sendForm'
    ];

    public function sendForm()
    {
        // * Email ke admin untuk notifikasi pesan masuk 
        $name = $_POST['name'];
        $from = $_POST['email'];
        $phone = $_POST['phone'];
        $message = $_POST['message'];
        $captcha = $_POST['g-recaptcha-response'];
        if (!$captcha) {
            $this->setFlash('warning', 'Email failed to send', 'Please check the recaptcha!');
            return $this->redirect($this->Link());
        }

        // Jalankan RECAPTCHA
        $response = json_decode(file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=" . Environment::getEnv('RECAPTCHA_KEY') . "&response=" . $captcha . "&remoteip=" . $_SERVER['REMOTE_ADDR']), true);

        // cek response recaptcha
        if ($response['success'] === true) {
            // kirimkan email 
            $email = Email::create()
                ->setHTMLTemplate('Email\\toAdmin')
                ->setData([
                    'Name' => $name,
                    'Email' => $from,
                    'Phone' => $phone,
                    'Message' => $message,
                    'Link' => BASE_URL,
                    'SiteConfig' => SiteConfig::current_site_config()
                ])->setFrom($from)
                ->setTo(Environment::getEnv('SS_SEND_ALL_EMAILS_TO'))
                ->setSubject('You got message from user aristocrartic');

            // cek apakah email berhasil dikirim atau tidak 
            if ($email->send()) {
                // email berhasil dikirimkan
                $this->setFlash('success', 'Email success to send', 'Email has been send, thanks');
                return $this->redirect($this->Link());
            } else {
                // email gagal dikirimkan 
                $this->setFlash('question', 'Email failed to send', 'Robot?');
                return $this->redirect($this->Link());
            }
        } else {
            $this->setFlash('warning', 'Email failed to send', 'Please check the recaptcha!');
            return $this->redirect($this->Link());
            // tampil pesan bahwa recaptcha gagal 
        }
    }
}
