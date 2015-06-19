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

	public function SetUserEquipment ($userEquipmentList){
		$userId = $this->GetCurrentUserId();

		$dbManager = new DatabaseManager();
        $db = $dbManager->Connect();

    	//get user balance
        $balanceResult = mysql_query("SELECT balance 
        		FROM users 
        		WHERE user_id='".$userId."' 
        		LIMIT 1", $db);
        $userBalance = floatval(mysql_result($balanceResult, 0));
        var_dump('User balance:'.$userBalance);

        //get average price for equipment
        $equipmentPriceTotal = $this->GetEquipmentTotal($userId, $userEquipmentList, $db);
		var_dump('Equipment total:'.$equipmentPriceTotal);

		//get time of user playing in last session
        $userPlayingTime = $this->GetUserPlayingTimeSession($userId, $db);
        var_dump('User game time:'.$userPlayingTime);
		
        //update user balance deducting coffee prices, employees pays, but add coffee prices
        $updatedUserBalanceWithCosts = $this->UpdateUserBalanceWithCosts($userId, $userBalance, $userPlayingTime, $db);
        var_dump('Balance with costs:'.$updatedUserBalanceWithCosts);

        //check balance - average price > 0
        //write equipment history changed
        //remove previous equipment
        //insert new equipment
        //update userBalanceGameTime
        
        if(mysql_num_rows($result)>0)
        {
	        // $prev_equipment_id = intval(mysql_result($result, 0));

	        // $result = mysql_query("SELECT name FROM equipmentTypes 
	        // 		WHERE equipment_type_id='".$equipmentTypeId."' LIMIT 1", $db);
	        // $equipment_name = mysql_result($result, 0);

	        // $prev_equipment_price = mysql_query("SELECT price FROM ".$equipment_name." 
	        // 		WHERE id='".$equipmentId."' LIMIT 1", $db);
    	}

		// mysql_query("INSERT INTO userEquipment 
  		//       		(user_id, equipment_id, equipment_type_id) 
  		//       		VALUES ('".$userId."', '".$equipmentId."', '".$equipmentTypeId."')", $db);
	}

	public function UpdateUserGameTime($sessionId){
		$userId = $this->GetCurrentUserId();		

		$dbManager = new DatabaseManager();
        $db = $dbManager->Connect();

        $endTimeResult = mysql_query("SELECT endTime 
        	FROM userGameTime 
        	WHERE user_id='".$userId."' 
        	ORDER BY created desc
        	LIMIT 1", $db);
        if(mysql_num_rows($endTimeResult) <= 0)
        {
        	mysql_query("INSERT INTO userGameTime 
        			(user_id, created, startTime, endTime, sessionId)
        			VALUES 
        			('".$userId."', UTC_TIMESTAMP(), UTC_TIMESTAMP(), UTC_TIMESTAMP(), '".$sessionId."')", $db);
        }else{
        	$endTime = strtotime(mysql_result($endTimeResult, 0));

        	$datetime = new DateTime(null, new DateTimeZone('UTC'));
			$datetime->modify('-1 minutes');
			
//			var_dump(date('Y-m-d H:i:s', $endTime));
//			var_dump(date('Y-m-d H:i:s', $datetime->getTimestamp()));

        	if($endTime < $datetime->getTimestamp()){
        		mysql_query("INSERT INTO userGameTime 
        			(user_id, created, startTime, endTime, sessionId)
        			VALUES 
        			('".$userId."', UTC_TIMESTAMP(), UTC_TIMESTAMP(), UTC_TIMESTAMP(), '".$sessionId."')", $db);
        	}else{
        		mysql_query("UPDATE userGameTime 
        			SET endTime = UTC_TIMESTAMP() 
        			WHERE user_id='".$userId."'
        			AND sessionId='".$sessionId."'", $db);
        	}
        }

        return true;
	}

	private function GetEquipmentTotal($userId, $userEquipmentList, $db){
		$price = 0;

		foreach ($userEquipmentList as $equipment) {
        	$equipmentType = $equipment['equipment_type_id'];

        	switch($equipmentType)
        	{
        		case 1: //coffeeGrinder
        		$equipmentPriceResult = mysql_query("SELECT price 
        			FROM coffeeGrinders cg	 
        			WHERE coffeeGrinder_id='".$equipment['id']."'
        			LIMIT 1", $db);
        		$price += floatval(mysql_result($equipmentPriceResult, 0));
        		break;

        		case 2: //coffeeMachine
        		$equipmentPriceResult = mysql_query("SELECT price 
        			FROM coffeeMachines cm	 
        			WHERE coffeeMachine_id='".$equipment['id']."'
        			LIMIT 1", $db);
        		$price += floatval(mysql_result($equipmentPriceResult, 0));
        		break;

        		case 3: //coffeePlace
        		$equipmentPriceResult = mysql_query("SELECT price 
        			FROM coffeePlaces cp	 
        			WHERE coffeePlace_id='".$equipment['id']."'
        			LIMIT 1", $db);
        		$price += floatval(mysql_result($equipmentPriceResult, 0));
        		break;
        	}
        }

        return $price;
	}

	private function GetUserPlayingTimeSession($userId, $db){
		$lastBalanceUpdatedTimeResult = mysql_query("SELECT updateTime 
        			FROM userBalanceUpdateTime ubut	 
        			WHERE user_id='".$userId."'
        			ORDER BY created desc
        			LIMIT 1", $db);
		//maybe convert into datetime
		$lastBalanceUpdatedTime = mysql_result($lastBalanceUpdatedTimeResult, 0);

		//get periods from which balance was updated
		$timeFullPeriodsSumResult = mysql_query("SELECT SUM(TIMESTAMPDIFF(SECOND, startTime, endTime)) as startEndDiff 
        			FROM userGameTime ugt	 
        			WHERE user_id='".$userId."'
        			AND startTime >= '".$lastBalanceUpdatedTime."'
        			ORDER BY created desc", $db);
		$timeFullPeriodsSum = mysql_result($timeFullPeriodsSumResult, 0);

		$timePeriodCurrentResult = mysql_query("SELECT TIMESTAMPDIFF(SECOND, startTime, '".$lastBalanceUpdatedTime."')  as startEndDiff
        			FROM userGameTime ugt	 
        			WHERE user_id='".$userId."'
        			AND startTime <= '".$lastBalanceUpdatedTime."'
        			AND endTime >= '".$lastBalanceUpdatedTime."'", $db);
		$timePeriodCurrent = mysql_result($timePeriodCurrentResult, 0);

		$fullPeriodTime = $timeFullPeriodsSum + $timePeriodCurrent;
		return $fullPeriodTime;
	}

	private function UpdateUserBalanceWithCosts($userId, $userBalance, $userPlayingTime, $db){
        
        $CoffeePlaceEquipmentTypeId = 3;
        $userCoffeePlacePrice = mysql_query("SELECT cp.price FROM userEquipment ue
                    INNER JOIN coffeePlaces cp ON ue.equipment_id = cp.coffeePlace_id
  		       		WHERE user_id = '".$userId."'
                    AND equipment_id = '".$CoffeePlaceEquipmentTypeId."'", $db);
        
        $CoffeeEmployeeEquipmentTypeId = 5;
        $userCoffeeEmployeePrice = mysql_query("SELECT ce.price FROM userEquipment ue
                    INNER JOIN coffeeEmployees ce ON ue.equipment_id = ce.coffeeEmployee_id
  		       		WHERE user_id = '".$userId."'
                    AND equipment_id = '".$CoffeeEmployeeEquipmentTypeId."'", $db);
        
        $CoffeeDrinkPriceEquipmentTypeId = 6;
        $userCoffeeDrinkPrice = mysql_query("SELECT cdp.price FROM userEquipment ue
                    INNER JOIN coffeeDrinkPrices cdp ON ue.equipment_id = cdp.coffeeDrinkPrice_id
  		       		WHERE user_id = '".$userId."'
                    AND equipment_id = '".$CoffeeDrinkPriceEquipmentTypeId."'", $db);
        
        $userCoffeePlacePricePerSecond = $userCoffeePlacePrice / (float) (60*60*24);
        $userCoffeeEmployeePricePerSecond = $userCoffeeEmployeePrice / (float) (60*60*24);
        
        $cupsSellPerSecond = 2;
        
        $userCoffeeDrinkPricePerSecond = $userCoffeeDrinkPrice * $cupsSellPerSecond;
        
        $balanceMovement = (-$userCoffeePlacePricePerSecond - $userCoffeeEmployeePricePerSecond + $userCoffeeDrinkPricePerSecond) * $userPlayingTime;
        
		return $balanceMovement + $userBalance;
	}
}