<?php require_once("server.php") ?>

<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:*");



$method = $_SERVER['REQUEST_METHOD'];


switch ($method) {
    case 'GET' :

        $path = explode('/' , $_SERVER['REQUEST_URI']);
        $postID = $path[4];
        $sql = "SELECT * FROM `users`
                INNER JOIN `posts` ON posts.user_id = users.id
                WHERE posts.post_id = '$postID' " ;
        $query = $connect->prepare($sql);
        $query->execute();
        $posts = $query->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($posts);
        break;


    case 'POST' :

        $text = $_POST["post"];
        $user_id = $_POST['user_id'];
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
                $sql = "INSERT INTO posts (user_id , content , post_image)
                        VALUES ( ? , ? , ? )" ;
                $query = $connect->prepare($sql);
                $query->execute([$user_id , $text , $fileName ]);
                break;
            } else {
            echo "Error uploading file";
            }
        } else {
            $sql = "INSERT INTO posts (user_id , content )
                    VALUES ( ? , ? )" ;
            $query = $connect->prepare($sql);
            $query->execute([$user_id , $text ]);
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