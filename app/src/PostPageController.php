<?php

namespace App\Web;

use PageController;
use App\Web\PostComment;
use SilverStripe\Control\HTTPRequest;

class PostPageController extends PageController
{
    private static $allowed_actions = [
        'handleComment',
        'getComments'
    ];

    public function handleComment()
    {
        $comment =  PostComment::create();
        $comment->Name = $_POST['Name'];
        $comment->Email = $_POST['Email'];
        $comment->Comment = $_POST['Comment'];
        $comment->Image = $_POST['Image'];

        $comment->PostPageID = $this->ID;
        $comment->write();

        // $this->setFlash('success', 'thank you', 'Your comment has been uploaded');
        // return $this->redirectBack();
        return json_encode([
            'status' => 200
        ]);
    }

    public function getComments(HTTPRequest $request)
    {
        $id = $request->getVar('id');

        $comments = PostComment::get()->filter([
            'PostPageID' => $id
        ]);

        foreach ($comments as $comment) {
            $row[] = [
                'Name' => $comment->Name,
                'Comment' => $comment->Comment,
                'Created' => date('M d, Y \a\t H:i', strtotime($comment->Created)),
                'Image' => $comment->Image
            ];
        }

        $response = [
            'status' => 200,
            'comment' => $row
        ];

        return json_encode($response);
    }
}
