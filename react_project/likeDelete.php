<?php require_once("server.php") ?>

<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:*");



$method = $_SERVER['REQUEST_METHOD'];


switch ($method) {

    case 'POST' :

        $likes = json_decode(file_get_contents('php://input'));
        print_r($likes);
        $sql = "DELETE FROM likes WHERE post_id = ? AND user_id = ?" ;
        $query = $connect->prepare($sql);
        if($query->execute([$likes->post_id , $likes->user_id])){
            echo 'Delete success';
        };
        break;
}