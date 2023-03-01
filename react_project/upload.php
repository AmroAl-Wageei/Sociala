<?php require_once("server.php") ?>

<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:*");

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $text = $_POST["text"];
    $user_id = $_POST['user_id'];
    $file = $_FILES["file"];
  
    $targetDir = "../src/components/images/";
    $fileName = basename($file["name"]);
    $targetPath = $targetDir . $fileName;
  
    if (move_uploaded_file($file["tmp_name"], $targetPath)) {
      echo "File uploaded successfully";
        $sql = "INSERT INTO groups (user_id , group_name , group_image)
                VALUES ( ? , ? , ? )" ;
        $query = $connect->prepare($sql);
        $query->execute([ $user_id , $text , $fileName]);
    } else {
      echo "Error uploading file";
    }
  
  } elseif ($_SERVER["REQUEST_METHOD"] === "GET") {


        $sql = "SELECT * 
                FROM groups
                INNER JOIN users WHERE groups.user_id = users.id" ;
        $query = $connect->prepare($sql);
        $query->execute();
        $users = $query->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($users);


  } elseif ($_SERVER["REQUEST_METHOD"] === "DELETE") {



        $sql = "DELETE FROM groups WHERE group_id = ?" ;
        $path = explode('/' , $_SERVER['REQUEST_URI']);
        if(isset($path[4]) && is_numeric($path[4])){
            $query = $connect->prepare($sql);
            $query->execute([$path[4]]);
    }
  }