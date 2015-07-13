<?php

session_start();

require_once(dirname(__FILE__).'/../database/databaseManager.php');

class GameUserManager{
	
	public $database;
   
	public function __construct(){
		   $this->database = new DatabaseManager();
	}



	private function GetCurrentUserId () {
		$user_id = isset($_SESSION['user_id'])?intval($_SESSION['user_id']) : null; 
		return $user_id;
	}

	public function GetUserBalance (){
		$userId = $this->GetCurrentUserId();
		if(is_null($userId)){
			 return 0;
		} 

        $result = mysql_query("SELECT balance FROM users WHERE user_id='".$userId."' LIMIT 1", $this->database->Connect()); 

        return floatval(mysql_result($result, 0));
	}

	public function SetUserEquipment ($equipmentId, $equipmentTypeId){
		$userId = $this->GetCurrentUserId(); 

        $result = mysql_query("SELECT equipment_Id FROM userEquipment 
        		WHERE user_id='".$userId."' AND equipment_type_id='".$equipmentTypeId."' 
        		ORDER BY created DESC 
        		LIMIT 1", $this->database->Connect());

        

		mysql_query("INSERT INTO userEquipment 
        		(user_id, equipment_id, equipment_type_id) 
        		VALUES ('".$userId."', '".$equipmentId."', '".$equipmentTypeId."')", $this->database->Connect());
	}

	/**
	* Reset all user settings
	*/
	public function globalReset(){ 
		   $userId = $this->GetCurrentUserId();
		   mysql_query("UPDATE users SET balance=55000 WHERE user_id = $userId", $this->database->Connect());
		   return 'ok';
	}

}