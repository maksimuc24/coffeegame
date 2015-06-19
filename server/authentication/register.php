<?php

require_once(dirname(__FILE__).'/UserManager.php');
require_once(dirname(__FILE__).'/../game/GameManager.php');

$userManager = new UserManager();
$gameManager = new GameManager();

$userManager->GetUsers() or die(mysql_error());

$submit = $_POST['submit'];
$cafeName = $_POST['cafeName'];
$password = $_POST['password'];

if(isset($submit))
{
    $err = array();

    if(strlen($cafeName) < 3 or strlen($cafeName) > 30)
    {
        $err[] = "Cafe Name could be from 3 to 30 symbols lenght.";
    }

    $result = $userManager->GetUsersCount($cafeName);

    if($result > 0)
    {
        $err[] = "User with same Cafe Name already exists.";
    }

    if(count($err) == 0)
    {
        $error = $userManager->AddUser($cafeName, $password);
        
        if($error != "")
        {
            var_dump($error);
        }else{
            header("Location: ".$gameManager->LoginUrl); exit();
        }
    }
    else
    {
        print "<b>There are next errors during registration:</b><br>";

        foreach($err AS $error)
        {
            print $error."<br>";
        }
    }
}