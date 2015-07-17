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
                    case 'reset-balance':
                        return $this->resetBalance();
                        break;
                    case 'buy-kg-coffe':
                        return $this->buyKgCoffee();
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

    /**
    * Reset all game information
    * @return {string}
    */
    public function resetBalance(){
        return $this->gameUserManager->globalReset();
    }

    public function buyKgCoffee(){
        return $this->gameUserManager->buyKgCoffee();
    }

}