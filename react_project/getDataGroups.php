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
            FROM groups
            INNER JOIN users
            ON groups.user_id = users.id
            WHERE groups.group_id=:id";
            $stmt =$connect->prepare($sql);
            $stmt->bindParam(':id', $path[4]);

            $stmt->execute();

            $members = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode( $members);
    
        break;

    }