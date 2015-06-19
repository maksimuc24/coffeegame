<?php

session_start();

require_once(dirname(__FILE__).'/UserManager.php');

$userManager = new UserManager();

$userId = isset($_SESSION['user_id'])  ?   $_SESSION['user_id'] : null;
$hash   = isset($_SESSION['user_hash'])? $_SESSION['user_hash'] : null;

if (isset($userId) and isset($hash))
{   
    $user = $userManager->GetUserById($userId);

    if(($user->hash !== $hash) or 
        ($user->userId !== $userId) or 
        (
            ($user->ip !== $_SERVER['REMOTE_ADDR']) and 
            ($user->ip !== "0")
        )
    )
    {
        session_destroy();
        print "Unhandled exception during authentication.";
    }
    else
    {
        $response = array("user_id" => $user->userId, "cafeName" => $user->cafeName);
        echo json_encode($response);
    }
}
else
{
    print "Sorry. You have no cookies in you browser. Authentication is not possible.";
}