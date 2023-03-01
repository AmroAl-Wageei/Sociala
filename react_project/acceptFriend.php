<?php require_once("server.php") ?>

<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:*");



$method = $_SERVER['REQUEST_METHOD'];


$path = explode('/',$_SERVER['REQUEST_URI']);
    // اللي بعثهم المستخدم pending عرض جميع طلبات الصداقة في حالة 
$sql = "SELECT *
FROM users
INNER JOIN friends
ON users.id = friends.friend_id
WHERE user_id = :id and status = :status";
$stmt =$connect->prepare($sql);
$status = "pending" ;
$stmt->bindParam(':status', $status);
$stmt->bindParam(':id', $path[4]);

$stmt->execute();

$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode( $users);


