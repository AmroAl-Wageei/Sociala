<?php require_once("server.php") ?>

<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:*");



$method = $_SERVER['REQUEST_METHOD'];



switch($method){
// لتقديم طلب الانظام للجروب
    case "POST":
        $user = json_decode(file_get_contents('php://input'));

        // print_r($user);break;
        $sql = "INSERT INTO members ( user_id , group_id  , status ) VALUES ( :user_id , :group_id  ,:status)";
        $stmt =$connect->prepare($sql);
        $status = "pending" ;
        $stmt->bindParam(':user_id', $user->user_id);
        $stmt->bindParam(':group_id', $user->group_id );
        $stmt->bindParam(':status', $status);
     
        if($stmt->execute()){
            $response = ['status'=>1,'message'=>'Record created successfully.'];
        }else{
            $response = ['status'=>0,'message'=>'Failed to created  record.'];

        }

        echo json_encode( $response);
        break;

    // لقبول طلب الانظمام
        case "PUT":

            $user = json_decode(file_get_contents('php://input'));

            $sql = "UPDATE  members SET  status = :status  WHERE user_id = :user_id and group_id = :group_id ";
            $stmt =$connect->prepare($sql);
            $status = "accepted";
            $stmt->bindParam(':status',   $status);
            $stmt->bindParam(':user_id', $user->user_id);
            $stmt->bindParam(':group_id', $user->group_id);
            $stmt->execute();

            
            if($stmt->execute()){
                $response = ['status'=>1,'message'=>'Record updated successfully.'];
            }else{
                $response = ['status'=>0,'message'=>'Failed to updated  record.'];

            }

            echo json_encode( $response);


      
            break;

}
?>