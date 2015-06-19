<?php

require_once (dirname(__FILE__).'/databaseConfig.php');

class DatabaseManager 
{
	public function Connect ()
	{
		global $DB_ADDRESS, $DB_USER, $DB_PASSWORD, $DB_NAME;

		$db = mysql_connect($DB_ADDRESS, $DB_USER, $DB_PASSWORD);
		mysql_select_db($DB_NAME, $db);

		return $db;
	}
}
