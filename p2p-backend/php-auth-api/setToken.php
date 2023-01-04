<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require __DIR__.'/classes/Database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

$token = $_POST['token'];
$id = $_POST['id'];

echo $token;
echo $id;

$update_token = "UPDATE `users` SET `token`=:token WHERE `id`=:id";
$query_stmt = $conn->prepare($update_token);
$query_stmt->bindValue(':token', $token,PDO::PARAM_STR);
$query_stmt->bindValue(':id', $id,PDO::PARAM_STR);
$query_stmt->execute();

// echo $query_stmt->rowCount();
echo true;