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
    * Get equipment price
    * @param userEquipment_id
    */
    public function getEquipmentPrice($equipment_id,$equipment_type_id){ 
    	    $table = '';
    	    $row   = ''; 
    	    if($equipment_type_id == 0) return;
    		switch ($equipment_type_id) {
		    	case 1:
		    		$table = "coffeegrinders";
		    		$row   = 'coffeeGrinder_id';
		    		break;
		    	case 2: 
		    		$table = "coffeemachines";
		    		$row   = 'coffeeMachine_id';
		    		break;
		    	case 3:
		    		$table = "coffeeplaces";
		    		$row   = 'coffeePlace_id';
		    		break;
		    	case 4:
		    		$table = "coffeetypes";
		    		$row   = 'coffeeType_id';
		    		break; 
		    	case 5:
		    		$table = "coffeeemployees";
		    		$row   = 'coffeeEmployee_id';
		    		break; 
		    	case 6:
		    		$table = "coffeedrinkprices";
		    		$row   = 'coffeeDrinkPrice_id';
		    		break;
		    }  

		    $query  = mysql_query("SELECT price FROM $table WHERE $row = $equipment_id", $this->database->Connect());
		    $result = mysql_fetch_array($query);
		    $price = (float)$result[0];
		    $this->updateUserBalance($price,"add");

     
    }
    /**
    * Set user equipment for user
    */
	public function SetUserEquipment ($equipmentId, $equipmentTypeId,$equipmentPrice){
		$userId = $this->GetCurrentUserId(); 

        $result = mysql_query("SELECT equipment_id,userEquipment_id,equipment_type_id FROM userequipment 
        		               WHERE user_id='".$userId."' AND equipment_type_id='".$equipmentTypeId."' 
        		               ORDER BY created DESC 
        		               LIMIT 1", $this->database->Connect());

        $row = mysql_fetch_array($result); 
        if(is_array($row)){ 
        	 $id = $row['userEquipment_id']; 
        	 //return price to balance  
        	 $this->getEquipmentPrice($row['equipment_id'],$row['equipment_type_id']);
        	 mysql_query("UPDATE userequipment 
        		         SET  equipment_id=$equipmentId, equipment_type_id=$equipmentTypeId WHERE userEquipment_id = $id", $this->database->Connect());
        	 $this->updateUserBalance($equipmentPrice);
        	
        }else{
        	mysql_query("INSERT INTO userequipment 
        		        (user_id, equipment_id, equipment_type_id) 
        		        VALUES ('".$userId."', '".$equipmentId."', '".$equipmentTypeId."')", $this->database->Connect());
        	$this->updateUserBalance($equipmentPrice);
        }  
	}

	/**
	* Update user balance
	*/
	public function updateUserBalance($price,$type = "minus"){
		$userId = $this->GetCurrentUserId(); 
	    $result = mysql_query("SELECT balance FROM users
        		               WHERE user_id=$userId", $this->database->Connect());

	    $row  = mysql_fetch_array($result);
	    //if not find
	    if(!is_array($row)){
	    	return;
	    }

	    $balance     = $row['balance'];
	    if($type == "add"){
	    	$new_balance = (float)$balance + (float)$price;
	    }else{
	    	$new_balance = (float)$balance - (float)$price;
	    }
	     
	    $result = mysql_query("UPDATE users SET balance=$new_balance
        		               WHERE user_id=$userId", $this->database->Connect());
	}

	/**
	* return all equipment
	*/
	public function getUserEquipment(){
		   $userId = $this->GetCurrentUserId();

		   $result = mysql_query("SELECT * FROM userequipment
        		               WHERE user_id=$userId", $this->database->Connect()); 
           
           $itog = array("grinder"     => null,
                         "machine"     => null,
                         "place"       => null, 
                         "coffe"       => null,
                         "employee"    => null,
                         "drink_price" => null);

	       while($row = mysql_fetch_array($result)){  
	             if($row["equipment_type_id"] == 1){
	             	$itog["grinder"] = $row['equipment_id'];
	             }else if($row["equipment_type_id"] == 2){
	             	$itog["machine"] = $row['equipment_id'];
	             } else if($row["equipment_type_id"] == 3){
	             	$itog["place"] = $row['equipment_id'];
	             }else if($row["equipment_type_id"] == 4){
	             	$itog["coffe"] = $row['equipment_id'];
	             }else if($row["equipment_type_id"] == 5){
	             	$itog["employee"] = $row['equipment_id'];
	             }else if($row["equipment_type_id"] == 6){
	             	$itog["drink_price"] = $row['equipment_id'];
	             }
	       } 

		   return $itog;
	}

	/**
	* Reset all user settings
	*/
	public function globalReset(){ 
		   $userId = $this->GetCurrentUserId();
		   mysql_query("UPDATE users SET balance=55000,
		   	                             is_play=0,
		   	                             total_drink=0,
		   	                             customers_in_queue=0,
		   	                             total_coffe_kg=0,
		   	                             opened_months=0,
		   	                             buy_total_coffe_kg=0

		   	                             WHERE user_id = $userId",
		   	                              $this->database->Connect());
		   mysql_query("DELETE FROM userequipment  WHERE user_id = $userId", $this->database->Connect());
 
		   return 'ok'; 
	}

	/**
	* Get id
	*/
	public function getEquipmentIdByType($type){
		    $equipment_type_id = 0;
		    $userId = $this->GetCurrentUserId();
		    if(is_null($userId)){
		    	return null;
		    }

		    switch ($type) {
		    	case "grinder":
		    		$equipment_type_id = 1;
		    		break;
		    	case "machine":
		    		$equipment_type_id = 2;
		    		break;
		    	case "place":
		    		$equipment_type_id = 3;
		    		break;
		    	case "coffe":
		    		$equipment_type_id = 4;
		    		break; 
		    	case "employee":
		    		$equipment_type_id = 5;
		    		break; 
		    	case "drink_price":
		    		$equipment_type_id = 6;
		    		break;
		    } 

		    $result = mysql_query("SELECT equipment_id FROM userequipment
        		               WHERE user_id=$userId AND equipment_type_id=$equipment_type_id", $this->database->Connect()); 
			

			$row  = mysql_fetch_array($result);
		    //if not find
		    if(!is_array($row)){
		    	return 0;
		    }
		    return $row["equipment_id"];
	}

	/**
	* Get top 10 sers for stats
	*/
	public function getTopStats(){
		$result = mysql_query("SELECT user_id AS id,cafeName,balance,opened_months  FROM `users` ORDER BY balance DESC LIMIT 10", $this->database->Connect()); 
			

		$data = array();
		while($row = mysql_fetch_assoc($result)){
		    array_push($data, $row);
		}
		 
		return $data;
	}
    
    /**
    * Get equipmetn by table
    */
    private  function getEquipmentIdByTable($tableType,$id){
    	    $table = '';
    	    $row   = ''; 
    	    if($tableType == 0) return;
    		switch ($tableType) {
		    	case 1:
		    		$table = "coffeegrinders";
		    		$row   = 'coffeeGrinder_id';
		    		break;
		    	case 2: 
		    		$table = "coffeemachines";
		    		$row   = 'coffeeMachine_id';
		    		break;
		    	case 3:
		    		$table = "coffeeplaces";
		    		$row   = 'coffeePlace_id';
		    		break;
		    	case 4:
		    		$table = "coffeetypes";
		    		$row   = 'coffeeType_id';
		    		break; 
		    	case 5:
		    		$table = "coffeeemployees";
		    		$row   = 'coffeeEmployee_id';
		    		break; 
		    	case 6:
		    		$table = "coffeedrinkprices";
		    		$row   = 'coffeeDrinkPrice_id';
		    		break;
		    }  
		    $query  = mysql_query("SELECT * FROM $table WHERE $row = $id", $this->database->Connect());
		    $result = mysql_fetch_array($query);

		    $itog = array();
		    $itog[$table] = $result;
		    return  $itog;
        	

    }  
    /**
    * Get user equipment for saved users
    */
    public function getSaveUserEquipment(){ 
             
            $userId = $this->GetCurrentUserId();
            $userequipmentQuery = mysql_query("SELECT * FROM userequipment WHERE user_id=$userId", $this->database->Connect());
        	
        	$userequipment = array();
            while($userequipmentRow   = mysql_fetch_array($userequipmentQuery)){ 
            	   $data = $this->getEquipmentIdByTable($userequipmentRow["equipment_type_id"],$userequipmentRow["equipment_id"]);
	               $userequipment[]    = $data; 
	        }
	        return $userequipment;  
    }

    /**
    * buy 1 kg of coffe
    */
    public function buyKgCoffee(){
    	   $userId = $this->GetCurrentUserId();
    	   $userequipmentQuery = mysql_query("SELECT  coffeetypes.price FROM userequipment 
												LEFT JOIN coffeetypes ON userequipment.equipment_id = coffeetypes.coffeeType_id
												WHERE userequipment.user_id = $userId
												and userequipment.equipment_type_id = 4", $this->database->Connect());
    	   $userequipmentRow   = mysql_fetch_assoc($userequipmentQuery);

    	   $userData = mysql_query("SELECT * FROM users WHERE user_id=$userId", $this->database->Connect());
    	   $userRow   = mysql_fetch_assoc($userData );

    	   if((float)$userRow['balance']>=(float)$userequipmentRow['price']){ 
    	   	    $kg = (float)$userRow['total_coffe_kg']+1;
    	   	    $balance = (float)$userRow['balance']-(float)$userequipmentRow['price'];

    	   	    mysql_query("UPDATE users SET balance=$balance,total_coffe_kg = $kg WHERE user_id=$userId", $this->database->Connect()); 
    	   } 
    	    
    }
    /**
    * Update all data
    */
    public function updateData($opened_months, $customers_in_queue,$total_coffe_kg,$total_drink,$balance,$buy_total_coffe_kg){
    	    $userId = $this->GetCurrentUserId();
    	   mysql_query("UPDATE users SET opened_months=$opened_months,
    	   								 customers_in_queue = $customers_in_queue,
    	   								 total_coffe_kg = $total_coffe_kg, 
    	   								 total_drink = $total_drink,
    	   								 balance=$balance,
    	   								 buy_total_coffe_kg=$buy_total_coffe_kg 
 
    	   								 WHERE user_id=$userId and is_play=1", $this->database->Connect()); 

    }

    public function getDetails(){
    	   $userId = $this->GetCurrentUserId();
    	   $userData =  mysql_query("SELECT opened_months,
    	   								 customers_in_queue,
    	   								 total_coffe_kg, 
    	   								 total_drink,
    	   								 buy_total_coffe_kg 
    	   								 FROM users
    	   								 WHERE user_id=$userId", $this->database->Connect()); 
    	   $userRow   = mysql_fetch_assoc($userData ); 
    	   return  $userRow;
    }
}