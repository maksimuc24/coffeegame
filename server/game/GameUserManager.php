<?php

session_start();

require_once(dirname(__FILE__).'/../database/databaseManager.php');

class GameUserManager{
	
	private function GetCurrentUserId () {
		return intval($_SESSION['user_id']);
	}

	public function GetUserBalance (){
		$userId = $this->GetCurrentUserId();

		$dbManager = new DatabaseManager();
        $db = $dbManager->Connect();

        $result = mysql_query("SELECT balance FROM users WHERE user_id='".$userId."' LIMIT 1", $db);
        return floatval(mysql_result($result, 0));
	}

	public function SetUserEquipment ($equipmentId, $equipmentTypeId){
		$userId = $this->GetCurrentUserId();

		$dbManager = new DatabaseManager();
        $db = $dbManager->Connect();

        $result = mysql_query("SELECT equipment_Id FROM userEquipment 
        		WHERE user_id='".$userId."' AND equipment_type_id='".$equipmentTypeId."' 
        		ORDER BY created DESC 
        		LIMIT 1", $db);

        if(mysql_num_rows($result)>0)
        {
	        // $prev_equipment_id = intval(mysql_result($result, 0));

	        // $result = mysql_query("SELECT name FROM equipmentTypes 
	        // 		WHERE equipment_type_id='".$equipmentTypeId."' LIMIT 1", $db);
	        // $equipment_name = mysql_result($result, 0);

	        // $prev_equipment_price = mysql_query("SELECT price FROM ".$equipment_name." 
	        // 		WHERE id='".$equipmentId."' LIMIT 1", $db);
    	}

		mysql_query("INSERT INTO userEquipment 
        		(user_id, equipment_id, equipment_type_id) 
        		VALUES ('".$userId."', '".$equipmentId."', '".$equipmentTypeId."')", $db);
	}

}