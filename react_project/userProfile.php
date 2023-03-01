<?php require_once("server.php") ?>

<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:*");


$method = $_SERVER['REQUEST_METHOD'];


switch ($method) {

    case 'GET' :

        $path = explode('/' , $_SERVER['REQUEST_URI']);
        $user_id = $path[4];
        $sql = "SELECT * FROM `users` WHERE id = '$user_id'" ;
        $query = $connect->prepare($sql);
        $query->execute();
        $user = $query->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($user);
        break;

}