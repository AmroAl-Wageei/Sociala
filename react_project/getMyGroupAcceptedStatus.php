<?php require_once("server.php") ?>

<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:*");



$method = $_SERVER['REQUEST_METHOD'];

switch($method){

    //  لحتى اجيب كل الجروبات اللي انظم الها المستخدم وتمت الموافقة عليها
    case "GET":

      
            $path = explode('/',$_SERVER['REQUEST_URI']);
            $sql = "SELECT *
            FROM groups
            INNER JOIN members
            ON groups.group_id = members.group_id
            WHERE members.user_id=:id and members.status=:status";
            $stmt =$connect->prepare($sql);
            $status = "accepted" ;
            $stmt->bindParam(':status', $status);
            $stmt->bindParam(':id', $path[4]);

            $stmt->execute();

            $members = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode( $members);
    
        break;
    }