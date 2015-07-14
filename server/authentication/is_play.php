<?php

session_start();

require_once(dirname(__FILE__).'/UserManager.php');

$userManager = new UserManager();

$userId = isset($_SESSION['user_id'])  ?   $_SESSION['user_id'] : null; 

if (isset($userId))
{   
    $user = $userManager->UserIsPlay($userId);

    if(isset($user['is_play'])){
        if($user['is_play']){
            $response = array("status" =>"play");
            echo json_encode($response);
        }else{
            print "User is't start play";
        }
    }else{
        print "User is't start play";
    }  
}
else
{
    print "User is't start play";
}