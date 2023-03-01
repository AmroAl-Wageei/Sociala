<?php require_once("server.php") ?>

<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:*");


$method = $_SERVER['REQUEST_METHOD'];


switch ($method) {

    case 'GET' :

        $path = explode('/' , $_SERVER['REQUEST_URI']);
        $user_id = $path[4];
        $sql = "SELECT * FROM `friends` 
                INNER JOIN `users` ON friends.user_id = users.id
                WHERE friend_id = '$user_id' OR user_id = '$user_id'" ;
        $query = $connect->prepare($sql);
        $query->execute();
        $friends = $query->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($friends);
        break;

}