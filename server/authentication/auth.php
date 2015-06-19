<?php

session_start();

require_once(dirname(__FILE__).'/UserManager.php');

$userManager = new UserManager();

$submit = $_POST['submit'];
$cafeName = $_POST['cafeName'];
$password = $_POST['password'];

if(isset($submit))
{
	if($userManager->CheckPassword($cafeName, $password))
    {
        var_dump($cafeName);

        $user = $userManager->UpdateHash($cafeName);

        var_dump($user);

        $_SESSION["user_id"] = $user->userId;
        $_SESSION["user_hash"] = $user->hash;
        $_SESSION["cafeName"] = $user->cafeName;
    }
    else
    {
        print "Your Cafe Name or Password is not correct!";
    }
}
