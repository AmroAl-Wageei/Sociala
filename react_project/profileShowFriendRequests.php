<?php require_once("server.php") ?>

<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:*");



$method = $_SERVER['REQUEST_METHOD'];


switch ($method) {
    case 'GET' :
        $path = explode('/' , $_SERVER['REQUEST_URI']);
        $currentID = $path[4];
        $sql = "SELECT * FROM `friends`
                INNER JOIN `users` ON   users.id = friends.user_id
                WHERE friends.friend_id = '$currentID' AND friends.status = 'pending' " ;
        $query = $connect->prepare($sql);
        $query->execute();
        $posts = $query->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($posts);
        break;


    case 'POST' :
        $idS = json_decode(file_get_contents('php://input'));
        $current_id = $idS->user_id;
        $requestFriend_id = $idS->friend_id;
        $sql ="DELETE FROM friends WHERE user_id = ? and friend_id = ? ";
        $query = $connect->prepare($sql);
        $query->execute([$requestFriend_id , $current_id]);
        echo json_encode($posts);
        break;
        
    }