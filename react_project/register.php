<?php require_once("server.php") ?>

<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:*");


$method = $_SERVER['REQUEST_METHOD'];


switch ($method) {

    case 'POST' :
        $users = json_decode(file_get_contents('php://input'));

        $email = $users->email;
        
        $oldData="SELECT * FROM users WHERE email = '$email' ";
        $stmt = $connect->prepare($oldData);
        $stmt->execute();
        $checkEmail = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        if($checkEmail == []){
            $sql = "INSERT INTO users (first_name , last_name , email , password)
                    VALUES (  ? , ? , ? , ? )" ;
            $query = $connect->prepare($sql);
            $query->execute([$users->first_name , $users->last_name , $users->email , $users->password]);

            $stmt2 = "SELECT * FROM users WHERE email = '$email'";
            $query2 = $connect->prepare($stmt2);
            $query2->execute();
            $getData = $query2->fetch(PDO::FETCH_ASSOC);
            echo json_encode(['first_name'=>$getData['first_name'] , 'last_name'=>$getData['last_name'] , 'id'=>$getData['id'] , 'email'=>$getData['email'] ]);
        } else {
            echo 'Your Email is Already Exist';
        }
        break;

}