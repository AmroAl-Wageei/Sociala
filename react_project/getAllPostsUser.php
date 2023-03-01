<?php require_once("server.php") ?>

<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:*");


$method = $_SERVER['REQUEST_METHOD'];


switch ($method) {

    case 'GET' :

        $path = explode('/' , $_SERVER['REQUEST_URI']);
        $user_id = $path[4];
        $sql = "SELECT * FROM `users` 
                INNER JOIN `posts` ON posts.user_id = users.id
                WHERE id = '$user_id' AND group_id = '0'
                ORDER BY `created_at` DESC" ;
        $query = $connect->prepare($sql);
        $query->execute();
        $posts = $query->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($posts);
        break;

}