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
    
    /**
    * Set user equipment for user
    */
	public function SetUserEquipment ($equipmentId, $equipmentTypeId,$equipmentPrice){
		$userId = $this->GetCurrentUserId(); 

        $result = mysql_query("SELECT equipment_Id,userEquipment_id FROM userEquipment 
        		               WHERE user_id='".$userId."' AND equipment_type_id='".$equipmentTypeId."' 
        		               ORDER BY created DESC 
        		               LIMIT 1", $this->database->Connect());

        $row = mysql_fetch_array($result);

        if(is_array($row)){
        	 $id = $row['userEquipment_id'];  
        	 mysql_query("UPDATE userEquipment 
        		         SET  equipment_id=$equipmentId, equipment_type_id=$equipmentTypeId WHERE userEquipment_id = $id", $this->database->Connect());
        	$this->updateUserBalance($equipmentPrice);
        }else{
        	mysql_query("INSERT INTO userEquipment 
        		        (user_id, equipment_id, equipment_type_id) 
        		        VALUES ('".$userId."', '".$equipmentId."', '".$equipmentTypeId."')", $this->database->Connect());
        	$this->updateUserBalance($equipmentPrice);
        }  
	}

	/**
	* Update user balance
	*/
	public function updateUserBalance($price){
		$userId = $this->GetCurrentUserId(); 
	    $result = mysql_query("SELECT balance FROM users
        		               WHERE user_id=$userId", $this->database->Connect());

	    $row         = mysql_fetch_array($result);
	    //if not find
	    if(!is_array($row)){
	    	return;
	    }

	    $balance     = $row['balance'];
	    $new_balance = (float)$balance-(float)$price;
	    $result = mysql_query("UPDATE users SET balance=$new_balance
        		               WHERE user_id=$userId", $this->database->Connect());
	}
	/**
	* Reset all user settings
	*/
	public function globalReset(){ 
		   $userId = $this->GetCurrentUserId();
		   mysql_query("UPDATE users SET balance=55000 WHERE user_id = $userId", $this->database->Connect());
		   mysql_query("DELETE FROM userequipment  WHERE user_id = $userId", $this->database->Connect());
		   return 'ok';
	}

}