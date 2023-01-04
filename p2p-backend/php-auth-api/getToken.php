<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// define('DB_HOST', 'localhost');
// define('DB_NAME', 'u1655934_p2p');
// define('DB_USER', 'u1655934_default');
// define('DB_PASSWORD', 'qeqRlSET97uR8m1z');

define('DB_HOST', 'localhost');
define('DB_NAME', 'p2p');
define('DB_USER', 'root');
define('DB_PASSWORD', 'root');



$mysqli = @new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
if ($mysqli->connect_errno) exit('Error connect');
$mysqli->set_charset('utf8');

$token = $_POST['token'];
$id = $_POST['id'];

$sql = "SELECT `token` FROM `users` WHERE `id`=$id";
$result = $mysqli->query($sql);
$result = $result->fetch_assoc();

// echo $result["token"];
// echo "<br/>";
// echo $token;

if ($result["token"] == $token) {
  echo 1;
} else {
  echo 0;
}
