<?php

use App\Web\Service;
use SilverStripe\Forms\Tab;
use SilverStripe\Forms\Form;
use SilverStripe\Forms\TabSet;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TextField;
use SilverStripe\Admin\ModelAdmin;
use SilverStripe\Forms\FormAction;
use SilverStripe\Admin\LeftAndMain;
use SilverStripe\Admin\LeftAndMainExtension;
use SilverStripe\Forms\LiteralField;
use SilverStripe\Admin\LeftAndMainFormRequestHandler;
use SilverStripe\View\Requirements;

class ChatAdmin extends LeftAndMain
{
  private static $menu_title = 'Chat';

  private static $url_segment = 'chat';

  private static $menu_icon_class = 'font-icon-chat';

  private static $allowed_actions = [
    'importForm'
  ];

  // public function getEditForm($id = null, $fields = null)
  // {
  //   $tabset = TabSet::create('Root')->setTemplate('CMSTabSet');

  //   $fields = new FieldList($tabset);

  //   $test = LiteralField::create('Title', '<h1>Hello World</h1>');

  //   $fields->addFieldToTab('Root.Main', $test);

  //   $form = new Form($this, 'Edit Form', $fields);

  //   $form->setHTMLID('Form_EditForm');
  //   $form->addExtraClass('cms-edit-form');
  //   $form->setTemplate($this->getTemplatesWithSuffix('_EditForm'));
  //   $form->addExtraClass('ss-tabset cms-tabset ' . $this->BaseCSSClasses());
  //   return $form;
  // }

  /**
   * @param Int $id
   * @param FieldList $fields
   * @return Form
   */
  public function getEditForm($id = null, $fields = null)
  {
    $form = parent::getEditForm($id, $fields);
    return $form;
  }

  protected function init()
  {
    parent::init();

    Requirements::css('css/bootstrap.min.css');
    Requirements::css('css/style-chat-admin.css');

    // Require Firebase Firestore
    Requirements::javascript('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
    Requirements::javascript('https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js');

    // Font Awesome
    Requirements::javascript('https://kit.fontawesome.com/cdf3502273.js');

    Requirements::javascript('javascript/jquery.js');
    Requirements::javascript('javascript/bootstrap.bundle.min.js');
    Requirements::javascript('javascript/sweetalert2.all.min.js');

    Requirements::javascript('javascript/firestore.js');
    Requirements::javascript('javascript/live-chat-admin.js');
  }
}
