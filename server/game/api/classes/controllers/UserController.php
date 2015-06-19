<?php

require_once (dirname(__FILE__).'/../../../GameUserManager.php');

class UserController extends AbstractController {

    private $gameUserManager;

    function __construct(){
        $this->gameUserManager = new GameUserManager();
    }

    public function get($request)
    {
        if(count($request->url_elements) == 2)
        {
            $methodName = $request->url_elements[1];

            switch ($methodName) {
                    case 'balance':
                        return $this->GetBalance();
                        break;

                    default:
                        return;
                        break;
                }    
        } else {
            return;
        }
    }

    public function GetBalance (){
        return $this->gameUserManager->GetUserBalance();
    }
}