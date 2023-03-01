<?php require_once("server.php") ?>

<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:*");



$method = $_SERVER['REQUEST_METHOD'];


switch ($method) {
    case 'GET' :


        $path = explode('/',$_SERVER['REQUEST_URI']);
        $sql = "SELECT * FROM `users`
                INNER JOIN `posts` ON posts.user_id = users.id
                WHERE group_id = ?
                ORDER BY posts.created_at DESC " ;
        // print_r($path[4]);break;
        $query = $connect->prepare($sql);
        // $stmt->bindParam(':group_id', $path[4]);
        $query->execute([$path[4]]);
        $posts = $query->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($posts);
        break;


    case 'POST' :

        $text = $_POST["post"];
        $user_id = $_POST['user_id'];
        $group_id = $_POST['group_id'];

        // print_r( $group_id);break;
        if($_FILES["file"] == null){
        $file = "";
        } else {
            $file = $_FILES["file"] ;
        }

        if($file != ""){
            $targetDir = "../src/components/images/";
            $fileName = basename($file["name"]);
            $targetPath = $targetDir . $fileName;
        
            if (move_uploaded_file($file["tmp_name"], $targetPath)) {
            echo "File uploaded successfully";
                $sql = "INSERT INTO posts (user_id , content , post_image , group_id)
                        VALUES ( ? , ? , ?,? )" ;
                $query = $connect->prepare($sql);
                $query->execute([$user_id , $text , $fileName , $group_id ]);
                break;
            } else {
            echo "Error uploading file";
            }
        } else {
            $sql = "INSERT INTO posts (user_id , content , group_id )
                    VALUES ( ? , ? , ? )" ;
            $query = $connect->prepare($sql);
            $query->execute([$user_id , $text , $group_id ]);
            break;
        }



    case 'DELETE' :
        $sql = "DELETE FROM posts WHERE post_id = ?" ;
        $path = explode('/' , $_SERVER['REQUEST_URI']);
        if(isset($path[4]) && is_numeric($path[4])){
            $query = $connect->prepare($sql);
            $query->execute([$path[4]]);
        }
        break;
}