<?php

session_start();

require_once(dirname(__FILE__).'/UserManager.php');

$userManager = new UserManager();

if(!isset($_SESSION['user_id']))
	return;
$userId = $_SESSION['user_id'];

$userManager->RemoveHash($userId);

session_destroy();