<?php require_once("server.php") ?>

<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:*");


$method = $_SERVER['REQUEST_METHOD'];


switch ($method) {
    case "GET":

        $sql = "SELECT * FROM users";
        $path = explode('/',$_SERVER['REQUEST_URI']);
        
        // print_r($path);break;
        if(isset($path[5])&&is_numeric($path[5])){

            $sql .= "   WHERE id = :id";
            $stmt =$connect->prepare($sql);
            $stmt->bindParam(':id', $path[5]);

            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        }else{

            $stmt =$connect->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        
        echo json_encode( $users);
        break;




    case "POST":
        $user = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO users ( id , name , email ,phone, password , created_at) VALUES ( null , :name, :email , :mobile,:password,:created_at)";
        $stmt =$connect->prepare($sql);
        $created_at = date('Y-m-d');
        $stmt->bindParam(':name', $user->fullName);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':mobile', $user->phone);
        $stmt->bindParam(':password', $user->password);
        $stmt->bindParam(':created_at', $created_at);
        if($stmt->execute()){
            $response = ['status'=>1,'message'=>'Record created successfully.'];
        }else{
            $response = ['status'=>0,'message'=>'Failed to created  record.'];

        }

        echo json_encode( $response);
        break;

        case "PUT":

        $user = json_decode(file_get_contents('php://input'));

        // print_r($user);break;
        $sql = "UPDATE  users SET  name = :name, email = :email , mobile = :mobile , password = :password, updated_at=:updated_at WHERE id = :id ";
        $stmt =$connect->prepare($sql);
        $updated_at = date('Y-m-d');
        $stmt->bindParam(':id', $user->id);
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':mobile', $user->mobile);
        $stmt->bindParam(':password', $user->password);
        $stmt->bindParam(':updated_at', $updated_at);
        if($stmt->execute()){
            $response = ['status'=>1,'message'=>'Record updated successfully.'];
        }else{
            $response = ['status'=>0,'message'=>'Failed to updated  record.'];

        }

        echo json_encode( $response);
        break;

        case "DELETE":

            $sql = "DELETE  FROM users WHERE id = :id";
            $path = explode('/',$_SERVER['REQUEST_URI']);
            $stmt =$connect->prepare($sql);
            $stmt->bindParam(':id', $path[5]);
            $stmt->execute();

            // print_r($path);

            if($stmt->execute()){
                $response = ['status'=>1,'message'=>'Record deleted successfully.'];
            }else{
                $response = ['status'=>0,'message'=>'Failed to delete  record.'];
    
            }
            echo json_encode( $response);
            break;


}
?>