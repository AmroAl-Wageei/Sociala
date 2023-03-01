<?php require_once("server.php") ?>

<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:*");



$method = $_SERVER['REQUEST_METHOD'];


switch ($method) {
    case 'GET' :

        $path = explode('/' , $_SERVER['REQUEST_URI']);
        $user_id = $path[4];

        $sql = "SELECT p.*, u.* , g.group_name
        FROM posts p 
        LEFT JOIN users u ON p.user_id = u.id
        LEFT JOIN groups g ON p.group_id = g.group_id
        WHERE p.user_id = $user_id OR p.group_id IN (
            SELECT group_id
            FROM groups
            WHERE user_id = $user_id
        ) OR p.user_id IN (
            SELECT friend_id
            FROM friends
            WHERE user_id = $user_id AND status = 'accepted'
        ) OR p.group_id IN (
            SELECT group_id
            FROM members
            WHERE user_id = $user_id
        )
        ORDER BY p.created_at DESC"; 

        $stmt = $connect->prepare($sql);
        $stmt->execute();
        $onePostForUserAndAdminAndGroup = $stmt->fetchAll(PDO::FETCH_ASSOC);
        // print_r($onePostForUserAndAdminAndGroup);

        echo json_encode($onePostForUserAndAdminAndGroup);

        
        // $allPosts = [];
        
        // $sql = "SELECT group_id FROM groups WHERE user_id = '$user_id'";
        // $stmt = $connect->prepare($sql);
        // $stmt->execute();
        // $myAdminGroup = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // for($i = 0 ; $i<count($myAdminGroup) ; $i++){
        //     $group_id = $myAdminGroup[$i]['group_id'];
        //     $sql = "SELECT * FROM posts WHERE posts.group_id = '$group_id'";
        //     $stmt = $connect->prepare($sql);
        //     $stmt->execute();
        //     $onePostForUserAndAdminAndGroup = $stmt->fetchAll(PDO::FETCH_ASSOC);
        //     array_push($allPosts , ...$onePostForUserAndAdminAndGroup);
        // }
        
        // $sql = "SELECT friend_id FROM friends WHERE user_id = '$user_id' AND status = 'accepted'";
        // $stmt = $connect->prepare($sql);
        // $stmt->execute();
        // $myFriends = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // for($i = 0 ; $i<count($myFriends) ; $i++){
        //     $friend_id = $myFriends[$i]['friend_id'];
        //     $sql = "SELECT * FROM posts WHERE posts.user_id = '$friend_id'";
        //     $stmt = $connect->prepare($sql);
        //     $stmt->execute();
        //     $onePostForUserAndAdminAndGroup = $stmt->fetchAll(PDO::FETCH_ASSOC);
        //     array_push($allPosts , ...$onePostForUserAndAdminAndGroup);
        // }
        
        // $sql = "SELECT group_id FROM members WHERE members.user_id = '$user_id'";
        // $stmt = $connect->prepare($sql);
        // $stmt->execute();
        // $userGroups = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        
        // for($i = 0 ; $i<count($userGroups) ; $i++){
        //     $group_id = $userGroups[$i]['group_id'];
        //     $sql = "SELECT * FROM posts WHERE posts.user_id = '$user_id' OR posts.group_id = '$group_id'";
        //     $stmt = $connect->prepare($sql);
        //     $stmt->execute();
        //     $onePostForUserAndAdminAndGroup = $stmt->fetchAll(PDO::FETCH_ASSOC);
        //     array_push($allPosts , ...$onePostForUserAndAdminAndGroup);
        // }
        
        // $postsDuplicateIndex = [];
        // $array = $allPosts;
        
        // foreach($allPosts as $index => $singlePost){
        //     $post_id = $singlePost['post_id'];
        //     $i = 0;
        //     foreach($array as $index => $duplicatePost){
        //         if($post_id == $duplicatePost['post_id']){
        //             if( $i > 0 ){
        //                 array_push($postsDuplicateIndex , $index);
        //             }
        //             $i++;
        //         }
        //     }
        // }
        
        // $finishPostDeuplicate = [];
        
        // for ($i = 0 ; $i<count($postsDuplicateIndex) ; $i++){
        //     if($i%2 == 0){
        //         array_push($finishPostDeuplicate , $postsDuplicateIndex[$i]);
        //     }
        // }
        
        // for ($i = 0 ; $i<count($finishPostDeuplicate) ; $i++){
        //     array_splice($allPosts , $finishPostDeuplicate[$i], 1);
        // }
        // echo json_encode($allPosts);
    break;
}