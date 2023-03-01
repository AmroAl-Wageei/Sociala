<?php require_once("server.php") ?>

<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:*");



$method = $_SERVER['REQUEST_METHOD'];



$user = json_decode(file_get_contents('php://input'));


// حذف الادمن لطلب الانظمام

            $sql = "DELETE  FROM members WHERE user_id = :user_id and group_id = :group_id ";
            
            $stmt =$connect->prepare($sql);
            $stmt->bindParam(':user_id', $user->user_id);
            $stmt->bindParam(':group_id', $user->group_id);
            $stmt->execute();
            
            // print_r($path);
            
            if($stmt->execute()){
                $response = ['status'=>1,'message'=>'Record deleted successfully.'];
            }else{
                $response = ['status'=>0,'message'=>'Failed to delete  record.'];
            
            }
            echo json_encode( $response);  