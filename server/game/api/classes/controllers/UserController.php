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
                    case 'get-details':
                        return $this->getDetails();
                        break;
                    case 'get-top-stats':
                        return $this->getTopStats();
                        break;

                    default:
                        return;
                        break;
                }    
        } else {
            return;
        }
    }

    public function post($request)
    {
        if(count($request->url_elements) == 2)
        {
            $settingName = $request->url_elements[1];

            switch ($settingName) {
                    case 'update-data': 
                        return $this->updateData($request->parameters['opened_months'], $request->parameters['customers_in_queue'],$request->parameters['total_coffe_kg'],$request->parameters['total_drink'],$request->parameters['balance'],$request->parameters['buy_total_coffe_kg']);
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

    public function updateData($opened_months, $customers_in_queue,$total_coffe_kg,$total_drink,$balance,$buy_total_coffe_kg){
            return $this->gameUserManager->updateData($opened_months, $customers_in_queue,$total_coffe_kg,$total_drink,$balance,$buy_total_coffe_kg);

    }

    public function getDetails(){
           return $this->gameUserManager->getDetails();
    }

    public function getTopStats(){
        return $this->gameUserManager->getTopStats();
    }
}