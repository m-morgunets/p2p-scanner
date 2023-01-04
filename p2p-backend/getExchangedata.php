<?php

header("Access-Control-Allow-Origin: *");

define('DB_HOST', 'localhost');
define('DB_NAME', 'exchangedata');
define('DB_USER', 'root');
define('DB_PASSWORD', 'root');

$data = $_POST;
$exchange = $data["exchange"];

$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
if ($mysqli->connect_errno) exit('Error connect');
$mysqli->set_charset('utf8');

$sql = "SELECT * FROM $exchange";

// print_r($sql);

$result = $mysqli->query($sql);

$data = array();
while ($row = $result->fetch_assoc()) // получаем все строки в цикле по одной
{
  $data[] = $row; // выводим данные
}


print_r(json_encode($data));
