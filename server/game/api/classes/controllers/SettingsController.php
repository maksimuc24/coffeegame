<?php

require_once (dirname(__FILE__).'/../../../../database/databaseManager.php');
require_once (dirname(__FILE__).'/../../../GameUserManager.php');

class SettingsController extends AbstractController {

    private $gameUserManager;
    private $database;
    function __construct(){
        $this->gameUserManager = new GameUserManager();
        $this->database        = new DatabaseManager();

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

                    case 'getUserEquipment':   
                        return $this->getUserEquipment();
                        break;
                    case 'get-user-equipment':   
                        return $this->getSaveUserEquipment();
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

        $result = mysql_query("SELECT cg.coffeeGrinder_id as id, cg.name,cg.quality ,cg.translate_name,cg.price,cg.gift_image,
                c.name as currency_name, et.equipmentType_id as equipment_type_id 
            FROM coffeegrinders cg 
            JOIN currencies c ON cg.currency_id = c.currency_id
            JOIN equipmenttypes et ON et.name='coffeeGrinders'", $db);
        $coffeeGrinders = array();


        $equipmenId   = $this->getEquipmentIdByType("grinder");

        while($row = mysql_fetch_array($result)){  
            $empty_row = array(); 
            if(floatval($row['price']) <= $user_balance or $row['id'] == $equipmenId) { 
                $empty_row['id']                = $row['id']; 
                $empty_row['name']              = $row['name'];
                $empty_row['price']             = $row['price'];
                $empty_row['equipment_type_id'] = $row['equipment_type_id'];
                $empty_row['currency_name']     = $row['currency_name'];
                $empty_row['translate_name']    = $row['translate_name'];
                $empty_row['gift_image']        = $row['gift_image'];
                $empty_row['quality']           = $row['quality'];
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

        $result = mysql_query("SELECT cm.coffeeMachine_id as id,cm.quality, cm.name,cm.translate_name, cm.price, cm.gift_image,
                c.name as currency_name, et.equipmentType_id as equipment_type_id
            FROM coffeemachines cm 
            JOIN currencies c ON cm.currency_id = c.currency_id
            JOIN equipmenttypes et ON et.name='coffeeMachines'", $db);

        $coffeeMachines = array();
        $equipmenId   = $this->getEquipmentIdByType("machine");


        while($row = mysql_fetch_array($result)){
            if(floatval($row['price']) <= $user_balance or $row['id'] == $equipmenId) {
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

        $result = mysql_query("SELECT cp.coffeePlace_id as id, cp.quality,cp.name,cp.translate_name, cp.price,cp.gift_image, 
                c.name as currency_name, tp.name as timePeriod_name, et.equipmentType_id as equipment_type_id
            FROM coffeeplaces cp 
            JOIN currencies c ON cp.currency_id = c.currency_id
            JOIN timeperiods tp ON tp.timePeriod_id = cp.timePeriod_id
            JOIN equipmenttypes et ON et.name='coffeePlaces'", $db);

 

        $coffeePlaces = array();
        $equipmenId   = $this->getEquipmentIdByType("place");


        while($row = mysql_fetch_array($result)){
            if(floatval($row['price']) <= $user_balance or $row['id'] == $equipmenId) {
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

        $result = mysql_query("SELECT ce.coffeeEmployee_id as id,ce.quality, ce.name,ce.translate_name, ce.price,ce.gift_image,  
                c.name as currency_name, tp.name as timePeriod_name, et.equipmentType_id as equipment_type_id
            FROM coffeeemployees ce 
            JOIN currencies c ON ce.currency_id = c.currency_id
            JOIN timeperiods tp ON ce.timePeriod_id = tp.timePeriod_id
            JOIN equipmenttypes et ON et.name='coffeeEmployees'", $db);

        $coffeeEmployees = array();
        $equipmenId   = $this->getEquipmentIdByType("employee");

        while($row = mysql_fetch_array($result)){
            if(floatval($row['price']) <= $user_balance or $row['id'] == $equipmenId) {
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

        $result = mysql_query("SELECT ct.coffeeType_id as id,ct.quality, ct.name,ct.translate_name, ct.price,ct.gift_image, 
                c.name as currency_name, wm.name as weight_name, et.equipmentType_id as equipment_type_id
            FROM coffeetypes ct 
            JOIN currencies c ON ct.currency_id = c.currency_id
            JOIN weightmeasurements wm ON ct.weightMeasurement_id = wm.weightMeasurement_id
            JOIN equipmenttypes et ON et.name='coffeeTypes'", $db);

        $coffeeTypes = array();
        $equipmenId   = $this->getEquipmentIdByType("coffe");

        while($row = mysql_fetch_array($result)){
            if(floatval($row['price']) <= $user_balance or $row['id'] == $equipmenId) {
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

        $result = mysql_query("SELECT cdp.coffeeDrinkPrice_id as id, cdp.price, cdp.quality,cdp.gift_image,
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


    /**
    * Get equipment id by type
    */
    public function getEquipmentIdByType($type){
           return $this->gameUserManager->getEquipmentIdByType($type);  
    }

    /**
    * Get all user equipment
    */

    private function getUserEquipment(){
            return $this->gameUserManager->getUserEquipment();

    }
    /**
    * Set user equipment for user
    */
    private function SetUserEquipment($equipmentId, $equipmentTypeId,$equipmentPrice){
           $this->gameUserManager->SetUserEquipment($equipmentId,$equipmentTypeId,$equipmentPrice);
    }

    /**
    * Get user equipment for saved users
    */
    private function getSaveUserEquipment(){
            $data = $this->gameUserManager->getSaveUserEquipment(); 
            return $data;
    }
}