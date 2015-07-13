<?php

require_once (dirname(__FILE__).'/../../../../database/databaseManager.php');
require_once (dirname(__FILE__).'/../../../GameUserManager.php');

class SettingsController extends AbstractController {

    private $gameUserManager;

    function __construct(){
        $this->gameUserManager = new GameUserManager();
    }

    public function get($request)
    {
        if(count($request->url_elements) == 2)
        {
            $settingName = $request->url_elements[1];

            switch ($settingName) {
                    case 'grinders':
                        return $this->GetCoffeeGrinders();
                        break;
                    
                    case 'machines':
                        return $this->GetCoffeeMachines();
                        break;

                    case 'places':
                        return $this->GetCoffeePlaces();
                        break;

                    case 'employees':
                        return $this->GetCoffeeEmployees();
                        break;

                    case 'coffeeTypes':
                        return $this->GetCoffeeTypes();
                        break;

                    case 'coffeePrices':
                        return $this->GetCoffeePrices();
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
                    case 'setUserEquipment':
                        var_dump($request->parameters);
                        return $this->SetUserEquipment($request->parameters['equipmentId'], $request->parameters['equipmentTypeId'],$request->parameters['equipmentPrice']);
                        break;

                    default:
                        return;
                        break;
            }    

        } else {
            return;
        }
    }

    private function GetCoffeeGrinders (){

        $dbManager = new DatabaseManager();
        $db = $dbManager->Connect();

        $user_balance = $this->gameUserManager->GetUserBalance();

        $result = mysql_query("SELECT cg.coffeeGrinder_id as id, cg.name,cg.translate_name, cg.price, 
                c.name as currency_name, et.equipmentType_id as equipment_type_id
            FROM coffeegrinders cg 
            JOIN currencies c ON cg.currency_id = c.currency_id
            JOIN equipmenttypes et ON et.name='coffeeGrinders'", $db);
        $coffeeGrinders = array();
        while($row = mysql_fetch_array($result)){  
            $empty_row = array(); 
            if(floatval($row['price']) <= $user_balance) { 
                $empty_row['id'] = $row['id']; 
                $empty_row['name'] = $row['name'];
                $empty_row['price'] = $row['price'];
                $empty_row['equipment_type_id'] = $row['equipment_type_id'];
                $empty_row['currency_name'] = $row['currency_name'];
                $empty_row['translate_name'] = $row['translate_name'];
                array_push($coffeeGrinders, $empty_row);
            }else{
                $empty_row['price'] = $row['price'];
                $empty_row['currency_name'] = $row['currency_name'];
                array_push($coffeeGrinders, $empty_row);
            }
        } 

        return $coffeeGrinders;
    }

    private function GetCoffeeMachines(){
        $dbManager = new DatabaseManager();
        $db = $dbManager->Connect();

        $user_balance = $this->gameUserManager->GetUserBalance();

        $result = mysql_query("SELECT cm.coffeeMachine_id as id, cm.name,cm.translate_name, cm.price, 
                c.name as currency_name, et.equipmentType_id as equipment_type_id
            FROM coffeemachines cm 
            JOIN currencies c ON cm.currency_id = c.currency_id
            JOIN equipmenttypes et ON et.name='coffeeMachines'", $db);
        $coffeeMachines = array();
        while($row = mysql_fetch_array($result)){
            if(floatval($row['price']) <= $user_balance) {
                $coffeeMachines[] = $row;
            }else{
                $empty_row['price'] = $row['price'];
                $empty_row['currency_name'] = $row['currency_name'];
                $coffeeMachines[] = $empty_row;
            }
        } 
        return $coffeeMachines;
    }

    private function GetCoffeePlaces(){
        $dbManager = new DatabaseManager();
        $db = $dbManager->Connect();

        $user_balance = $this->gameUserManager->GetUserBalance();

        $result = mysql_query("SELECT cp.coffeePlace_id as id, cp.name,cp.translate_name, cp.price, 
                c.name as currency_name, tp.name as timePeriod_name, et.equipmentType_id as equipment_type_id
            FROM coffeeplaces cp 
            JOIN currencies c ON cp.currency_id = c.currency_id
            JOIN timeperiods tp ON tp.timePeriod_id = cp.timePeriod_id
            JOIN equipmenttypes et ON et.name='coffeePlaces'", $db);
        $coffeePlaces = array();
        while($row = mysql_fetch_array($result)){
            if(floatval($row['price']) <= $user_balance) {
                $coffeePlaces[] = $row;
            }else{
                $empty_row['price'] = $row['price'];
                $empty_row['currency_name'] = $row['currency_name'];
                $empty_row['timePeriod_name'] = $row['timePeriod_name'];
                $coffeePlaces[] = $empty_row;
            }
        }
        
        return $coffeePlaces;
    }

    private function GetCoffeeEmployees(){
        $dbManager = new DatabaseManager();
        $db = $dbManager->Connect();

        $user_balance = $this->gameUserManager->GetUserBalance();

        $result = mysql_query("SELECT ce.coffeeEmployee_id as id, ce.name,ce.translate_name, ce.price, 
                c.name as currency_name, tp.name as timePeriod_name, et.equipmentType_id as equipment_type_id
            FROM coffeeemployees ce 
            JOIN currencies c ON ce.currency_id = c.currency_id
            JOIN timeperiods tp ON ce.timePeriod_id = tp.timePeriod_id
            JOIN equipmenttypes et ON et.name='coffeeEmployees'", $db);
        $coffeeEmployees = array();
        while($row = mysql_fetch_array($result)){
            if(floatval($row['price']) <= $user_balance) {
                $coffeeEmployees[] = $row;
            }else{
                $empty_row['price'] = $row['price'];
                $empty_row['currency_name'] = $row['currency_name'];
                $empty_row['timePeriod_name'] = $row['timePeriod_name'];
                $coffeeEmployees[] = $empty_row;
            }
        }
        
        return $coffeeEmployees;
    }

    private function GetCoffeeTypes(){
        $dbManager = new DatabaseManager();
        $db = $dbManager->Connect();

        $user_balance = $this->gameUserManager->GetUserBalance();

        $result = mysql_query("SELECT ct.coffeeType_id as id, ct.name,ct.translate_name, ct.price, 
                c.name as currency_name, wm.name as weight_name, et.equipmentType_id as equipment_type_id
            FROM coffeetypes ct 
            JOIN currencies c ON ct.currency_id = c.currency_id
            JOIN weightmeasurements wm ON ct.weightMeasurement_id = wm.weightMeasurement_id
            JOIN equipmenttypes et ON et.name='coffeeTypes'", $db);
        $coffeeTypes = array();
        while($row = mysql_fetch_array($result)){
            if(floatval($row['price']) <= $user_balance) {
                $coffeeTypes[] = $row;
            }else{
                $empty_row['price'] = $row['price'];
                $empty_row['currency_name'] = $row['currency_name'];
                $empty_row['weight_name'] = $row['weight_name'];
                $coffeeTypes[] = $empty_row;
            }
        }
        
        return $coffeeTypes;
    }

    private function GetCoffeePrices(){
        $dbManager = new DatabaseManager();
        $db = $dbManager->Connect();

        $user_balance = $this->gameUserManager->GetUserBalance();

        $result = mysql_query("SELECT cdp.coffeeDrinkPrice_id as id, cdp.price, 
                c.name as currency_name, dp.name as portion_name, et.equipmentType_id as equipment_type_id
            FROM coffeedrinkprices cdp 
            JOIN currencies c ON cdp.currency_id = c.currency_id
            JOIN drinkportions dp ON cdp.drinkPortion_id = dp.drinkPortion_id
            JOIN equipmenttypes et ON et.name='coffeeDrinkPrices'", $db);
        $coffeePrices = array();
        while($row = mysql_fetch_array($result)){
            $coffeePrices[] = $row;
        }
        
        return $coffeePrices;
    }

    private function SetUserEquipment($equipmentId, $equipmentTypeId,$equipmentPrice){
        $dbManager = new DatabaseManager();
        $db = $dbManager->Connect();

        $this->gameUserManager->SetUserEquipment($equipmentId,$equipmentTypeId,$equipmentPrice);
    }
}