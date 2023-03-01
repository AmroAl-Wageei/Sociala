<?php require_once("server.php") ?>

<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:*");



$method = $_SERVER['REQUEST_METHOD'];

switch($method){
    case "GET":

      
            $path = explode('/',$_SERVER['REQUEST_URI']);
            // اللي بعثهم المستخدم pending عرض جميع طلبات الصداقة في حالة 
            $sql = "SELECT *
            FROM users
            INNER JOIN members
            ON members.user_id = users.id
            WHERE members.group_id=:id  AND members.status= 'accepted'";
            $stmt =$connect->prepare($sql);
            $stmt->bindParam(':id', $path[4]);

            $stmt->execute();

            $members = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode( $members);
    
        break;

    }