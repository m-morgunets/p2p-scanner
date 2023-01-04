<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require __DIR__ . '/classes/Database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

function msg($success, $status, $message, $extra = [])
{
  return array_merge([
    'success' => $success,
    'status' => $status,
    'message' => $message
  ], $extra);
}

// DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));
$returnData = [];

if ($_SERVER["REQUEST_METHOD"] != "POST") :

  $returnData = msg(0, 404, 'Страница не найдена!');

elseif ( !isset($data->password) && !isset($data->email) ) :

  $fields = ['fields' => ['password']];
  $returnData = msg(0, 422, 'Пожалуйста, заполните все обязательные поля!', $fields);

// IF THERE ARE NO EMPTY FIELDS THEN-
else :

  $password = trim($data->password);
  $email = trim($data->email);

  if (strlen($password) < 8) :
    $returnData = msg(0, 422, 'Ваш пароль должен быть не менее 8 символов!');

  else :
    try {

      $update_query = "UPDATE `users` SET `password`=:password WHERE `email`=:email";

      $update_stmt = $conn->prepare($update_query);

      // DATA BINDING
      $update_stmt->bindValue(':email', $email, PDO::PARAM_STR);
      $update_stmt->bindValue(':password', password_hash($password, PASSWORD_DEFAULT), PDO::PARAM_STR);

      $update_stmt->execute();

      $returnData = msg(1, 201, 'Пароль успешно изменён.');

    } catch (PDOException $e) {
      $returnData = msg(0, 500, $e->getMessage());
    }
  endif;
endif;

echo json_encode($returnData);
