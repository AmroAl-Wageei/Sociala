<?php require_once("server.php") ?>

<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:*");



$method = $_SERVER['REQUEST_METHOD'];


switch ($method) {
    case 'GET' :
        $sql = "SELECT * FROM `users`
                INNER JOIN `comments` ON comments.user_id = users.id" ;
        $query = $connect->prepare($sql);
        $query->execute();
        $comments = $query->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($comments);
        break;



    case 'POST' :
        $comments = json_decode(file_get_contents('php://input'));

        print_r($comments);
        
        $sql = "INSERT INTO comments (user_id , post_id , comment_contet)
                VALUES (  ? , ? , ? )" ;
        $query = $connect->prepare($sql);
        $query->execute([$comments->user_id , $comments->post_id , $comments->comment_contet]);
        break;

    }