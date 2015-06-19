<?php

require_once (dirname(__FILE__).'/../../../GameUserManager.php');

session_start();

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

                case 'heartbeat':
                return $this->UpdateUserGameTime();
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
            $methodName = $request->url_elements[1];

            switch ($methodName) {
                case 'setUserEquipment':
                return $this->SetUserEquipment($request->parameters['userEquipmentList']);
                break;

                default:
                return;
                break;
            }    
        } else {
            return;
        }
    }

    private function GetBalance (){
        return $this->gameUserManager->GetUserBalance();
    }

    private function SetUserEquipment($userEquipmentList){
        return $this->gameUserManager->SetUserEquipment($userEquipmentList);
    }

    private function UpdateUserGameTime(){
        return $this->gameUserManager->UpdateUserGameTime(session_id());
    }
}