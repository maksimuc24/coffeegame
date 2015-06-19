<?php

require_once (dirname(__FILE__).'/../database/databaseManager.php');
require_once (dirname(__FILE__).'/../game/GameManager.php');
require_once (dirname(__FILE__).'/User.php');

class UserManager {
	private $dbManager;
	private $db;

	private $gameManager;

	function __construct(){
		$this->dbManager = new DatabaseManager();
        $this->db = $this->dbManager->Connect();

        $this->gameManager = new GameManager();
	}

	public function GetUsers(){
		return mysql_query("select * from users;", $this->db);
	}

	public function GetUsersCount($cafeName){
		$result = mysql_query("SELECT COUNT(*) FROM users WHERE cafeName='".
				mysql_real_escape_string($cafeName)."';", $this->db);
		return mysql_result($result, 0);
	}

	public function AddUser($cafeName, $password) {
		$password_md5 = $this->DecodePassword($password);

		$balance = $this->gameManager->userStartBalance;

        mysql_query("INSERT INTO users SET cafeName='".mysql_real_escape_string($cafeName)."', ".
        				"user_password='".$password_md5."', ".
        				"user_hash='".$password_md5."', ".
                        "balance = '".$balance."'", $this->db);
        return mysql_error();
	}

	public function GetUserById($userId){
		$query = mysql_query("SELECT user_id, cafeName, user_hash, user_ip FROM users WHERE user_id = '".
			intval($userId)."' LIMIT 1", $this->db);
    	$data = mysql_fetch_assoc($query);

    	$user = new User();
    	$user->userId = $data['user_id'];
    	$user->cafeName = $data['cafeName'];
    	$user->hash = $data['user_hash'];
    	$user->ip = $data['user_ip'];

    	return $user;
	}

	public function GetUserByName($cafeName){
		var_dump($cafeName);

		$query = mysql_query("SELECT user_id, cafeName, user_password FROM users WHERE cafeName='".
	    	mysql_real_escape_string($cafeName)."' LIMIT 1", $this->db);
    	$data = mysql_fetch_assoc($query);

    	$user = new User();
    	$user->userId = $data['user_id'];
    	$user->cafeName = $data['cafeName'];
    	$user->password = $data['user_password'];

    	return $user;
	}

	public function UpdateHash($cafeName) {
		$hash = md5($this->GenerateHash(10));

        $user = $this->GetUserByName($cafeName);

    	mysql_query("UPDATE users SET user_hash='".$hash."' WHERE user_id='".
			$user->userId."'", $this->db);

    	$user->hash = $hash;

        return $user;
	}

	public function CheckPassword($cafeName, $password) {
	    $user = $this->GetUserByName($cafeName);

	    var_dump($user->password);

    	$password_md5 = $this->DecodePassword($password);

    	var_dump($password_md5);

    	return $user->password === $password_md5;
	}

	public function RemoveHash($userId){
		mysql_query("UPDATE users SET user_hash='' WHERE user_id='".
				$userId."'", $this->db);
	}

	private function GenerateHash ($length=6) {
	    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHI JKLMNOPRQSTUVWXYZ0123456789";

	    $code = "";
	    $clen = strlen($chars) - 1;  
	    while (strlen($code) < $length) {
	            $code .= $chars[mt_rand(0,$clen)];  
	    }
    	return $code;
	}

	private function DecodePassword($password) {
		return md5(md5(trim($password)));
	}
}