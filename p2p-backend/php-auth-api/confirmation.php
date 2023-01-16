<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


define('DB_HOST', 'localhost');
define('DB_NAME', 'p2p');
define('DB_USER', 'root');
define('DB_PASSWORD', 'root');



$mysqli = @new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
if ($mysqli->connect_errno) exit('Error connect');
$mysqli->set_charset('utf8');

$data = $_POST;

if (isset($data['code']) && isset($data['id'])) {
  $code = $data['code'];
  $id = $data['id'];

  $sql = "SELECT `code` FROM `confirmation` WHERE `id` = $id";
  $result = $mysqli->query($sql);
  $result = $result->fetch_assoc();

  if ($result['code'] == $code && $code != '') {
    print_r(true);
    $sql = "DELETE FROM `confirmation` WHERE `id` = $id";
    $result = $mysqli->query($sql);

  } else{
    print_r(false);
  }

} else if (isset($data['email'])) {
  $getCode = random_int(100000, 999999);
  $email = $data['email'];

  $sql = "INSERT INTO `confirmation`(`code`) VALUES($getCode)";
  $result = $mysqli->query($sql);
  
  $sql = "SELECT `id` FROM `confirmation` WHERE `code` = $getCode";
  $result = $mysqli->query($sql);
  $result = $result->fetch_assoc();

  $to      = "$email";
  $subject = 'Код подтверждения';
  $message = "Ваш код для подтверждения почты: $getCode";
  // $headers = 'From: p2p-scaner@example.com'       . "\r\n" .
  //             'Reply-To: p2p-scaner@example.com' . "\r\n" .
  //             'X-Mailer: PHP/' . phpversion();

  mail($to, $subject, $message);
  
  print_r($result['id']);
}
