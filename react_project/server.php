<?php

$server = "localhost";
$username = "root";
$password = "";
$dbname = "platform";

$dsn = "mysql:host=$server;dbname=$dbname";

try {
    $connect = new PDO($dsn, $username, $password);
    $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $error){
    echo "Error : " . $error->getMessage();
}
?>

<?php

header("Access-Control-Allow-Origin:*");

header("Content-type: application/json ; charset=UTF-8");

header("Access-Control-Allow-Methods:*");

header("Access-Control-Max-Age:3600:*");

header("Access-Control-Allow-Headers:*");

// fetch user infonmation 
// 1. open connction 





// $query = $connect->prepare("SELECT * FROM users");
// $query->execute();
// $userset = $query->fetchAll(PDO::FETCH_ASSOC);

// if(!empty($userset)){
//     $JSON_data=json_encode($userset);
//     print_r($JSON_data);
    
// }else{
//     echo "user not found";
// }
// die;


// print_r($JSON_data);

?>