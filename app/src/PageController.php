<?php

namespace {

    use SilverStripe\GraphQL\Controller as graph;
    use SilverStripe\CMS\Controllers\ContentController;
    use SilverStripe\Control\HTTPResponse;
    use SilverStripe\Security\Security;
    use SilverStripe\View\Requirements;

    class PageController extends ContentController
    {
        /**
         * An array of actions that can be accessed via a request. Each array element should be an action name, and the
         * permissions or conditions required to allow the user to access it.
         *
         * <code>
         * [
         *     'action', // anyone can access this action
         *     'action' => true, // same as above
         *     'action' => 'ADMIN', // you must have ADMIN permissions to access this action
         *     'action' => '->checkAction' // you can only access this action if $this->checkAction() returns true
         * ];
         * </code>
         *
         * @var array
         */
        private static $allowed_actions = [];

        protected function init()
        {
            parent::init();
            // You can include any CSS or JS required by your project here.
            // See: https://docs.silverstripe.org/en/developer_guides/templates/requirements/
            Requirements::css('css/bootstrap.min.css');
            Requirements::css('css/style.css');
            Requirements::css('css/style-chat.css');
            Requirements::css('css/iziModal.min.css');

            // Require Firebase Firestore
            Requirements::javascript('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
            Requirements::javascript('https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js');

            Requirements::javascript('javascript/jquery.js');
            Requirements::javascript('javascript/bootstrap.min.js');
            Requirements::javascript('javascript/sweetalert2.all.min.js');
            Requirements::javascript('javascript/iziModal.min.js');
            Requirements::javascript('javascript/script.js');

            Requirements::javascript('javascript/firestore.js');
            Requirements::javascript('javascript/live-chat-user.js');
        }

        public function setFlash($icon, $title, $text)
        {
            $session = $this->getRequest()->getSession();
            $session->set('flash', "$icon|$title|$text");
        }

        public function flash()
        {
            $session = $this->getRequest()->getSession();
            $data = $session->get('flash');
            if ($data) {
                $session->clear('flash');
                return $data;
            }
        }
    }
}
