<?php require_once("server.php") ?>

<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:*");



$method = $_SERVER['REQUEST_METHOD'];


$path = explode('/',$_SERVER['REQUEST_URI']);

// هون بجيب كل طلبات الصداقة اللي تم ارسالهم للمستخد واللي لسا ما وافق عليها مع بيانات الشخص اللي ارسال الطلب
$sql = "SELECT *
FROM users
INNER JOIN friends
ON users.id = friends.user_id
WHERE friend_id = :id and status = :status";
$stmt =$connect->prepare($sql);
$status = "pending" ;
$stmt->bindParam(':status', $status);
$stmt->bindParam(':id', $path[4]);

$stmt->execute();

$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode( $users);


