<?php require_once("server.php") ?>

<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:*");


$method = $_SERVER['REQUEST_METHOD'];


switch ($method) {

    case 'POST' :
        $users = json_decode(file_get_contents('php://input'));

        $email = $users->email;
        $password = $users->password;
        
        $oldData="SELECT * FROM users WHERE email = '$email' ";
        $stmt = $connect->prepare($oldData);
        $stmt->execute();
        $checkEmail = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if($checkEmail == []){
            echo'invalid login';
            break;
        } else {
            if($checkEmail['password'] == $password){
                print_r(json_encode(['first_name'=>$checkEmail['first_name'] , 'last_name'=>$checkEmail['last_name'] , 'id'=>$checkEmail['id'] , 'email'=>$checkEmail['email'] ]));
                break;
            } else {
                echo'invalid login';
                break;
            }
        }
        break;
}