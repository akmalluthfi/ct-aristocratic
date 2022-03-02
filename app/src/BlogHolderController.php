<?php

namespace App\Web;

use PageController;
use App\Web\PostPage;
use App\Web\Subscriber;
use App\Web\PostCategory;
use PhpParser\Node\Expr\FuncCall;
use SilverStripe\ORM\PaginatedList;
use SilverStripe\Control\Email\Email;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\SiteConfig\SiteConfig;

class BlogHolderController extends PageController
{
    private static $allowed_actions = [
        // 'category',
        'handleSubs',
        'unSubs'
    ];

    protected $postsList;

    protected function init()
    {
        parent::init();
        $this->postsList = PostPage::get()->sort('ID', 'DESC');
    }

    public function index(HTTPRequest $request)
    {
        // $posts = PostPage::get()->sort('ID DESC');

        // begin filter by search 
        $search = $request->getVar('keyword');

        if ($search) {
            $this->postsList = $this->postsList->filter([
                'Title:PartialMatch' => $search
            ]);
        }

        // begin filter by category
        // cek apakah ada nilai di url

        $category = $request->getVar('categoryID');

        if ($category) {
            $category = PostCategory::get_by_id($category);
            $this->postsList = $this->postsList->filter([
                'Categories.ID' => $category->ID
            ]);

            $category = $category->Name;
        }

        // buat pagination
        $paginatedPosts = PaginatedList::create(
            $this->postsList,
            $request
        )->setPageLength(5)->setPaginationGetVar('p');

        $data = [
            'Keyword' => $search,
            'Result' => $paginatedPosts,
            'Category' => $category
        ];

        if ($request->isAjax()) {
            return $this->customise($data)->renderWith('App/Web/Includes/BlogResult');
        }

        return $data;
    }

    public function handleSubs()
    {
        //* Email untuk menangani user yang baru subscribe
        // ambil data email 
        $emailUser = $_POST['email'];
        // tambahkan email ke database 
        $subs = Subscriber::create();
        $subs->Email = $emailUser;
        $subs->write();

        // jika berhasil kirimkan email ke user
        $email = Email::create()
            ->setHTMLTemplate('Email\\Subs')
            ->setData([
                'Email' => $emailUser,
                'Link' => BASE_URL,
                'SiteConfig' => SiteConfig::current_site_config()
            ])
            ->setFrom('admin@aristocratic.com', 'admin')
            ->setTo($emailUser)
            ->setSubject('welcome to aristocratic');

        if ($email->send()) {
            $data = [
                'dataStatus' => 200,
                'emailStatus' => 200
            ];
        } else {
            $data = [
                'dataStatus' => 200,
                'emailStatus' => 500
            ];
        }

        return json_encode($data);
    }

    public function unSubs(HTTPRequest $request)
    {
        //* hapus email dari database
        $id = $request->getVar('id');
        $subs = Subscriber::get_by_id($id);
        $subs->delete_by_id(Subscriber::class, $id);

        // jika berhasil kirimkan email notifikasi 
        $email = Email::create()->setHTMLTemplate('Email\\unSubs')
            ->setData([
                'Email' => $subs->Email,
                'Link' => BASE_URL,
                'SiteConfig' => SiteConfig::current_site_config()
            ])
            ->setFrom('admin@aristocratic.com', 'admin')
            ->setTo($subs->Email)
            ->setSubject('Unsubscriber Email');

        if ($email->send()) {
            $this->setFlash('success', 'Success unsubscribe', 'Your email has been removed from list subscriber');
            $this->redirect($this->Link());
            // kirimkan notif unsubscribe success
        } else {
            $this->setFlash('error', 'Failed to unsubscribe', "Something wen't wrong");
            $this->redirect($this->Link());
            // kirimkan notif unsubscribe gagal
        }
    }

    // public function category(HTTPRequest $request)
    // {
    //     $category = PostCategory::get_by_id($request->param('ID'));

    //     // cek apakah ada category dengan id yang dikirimkan 
    //     if (!$category) {
    //         return $this->httpError(404, 'That category was not found');
    //     }

    //     $this->postsList = $this->postsList->filter([
    //         'Categories.ID' => $category->ID
    //     ]);

    //     return [
    //         'Result' => $this->postsList
    //     ];
    // }

}
