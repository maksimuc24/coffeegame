<?php

session_start();

require_once(dirname(__FILE__).'/UserManager.php');

$userManager = new UserManager();

$userId = isset($_SESSION['user_id'])  ?   $_SESSION['user_id'] : null; 

if (isset($userId))
{   
    $user = $userManager->UserStartPlay($userId);
    $response = array("status" =>"start play");
    echo json_encode($response);
        
} 