<?php

session_start();

require_once(dirname(__FILE__).'/UserManager.php');

$userManager = new UserManager();

$userId = $_SESSION['user_id'];

$userManager->RemoveHash($userId);

session_destroy();