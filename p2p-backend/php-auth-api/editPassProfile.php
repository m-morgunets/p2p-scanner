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

elseif (!isset($data->oldPass) && !isset($data->id) && !isset($data->newPass)) :

  $fields = ['fields' => ['password']];
  $returnData = msg(0, 422, 'Пожалуйста, заполните все обязательные поля!', $fields);

// IF THERE ARE NO EMPTY FIELDS THEN-
else :

  $id = trim($data->id);
  $oldPass = trim($data->oldPass);
  $newPass = trim($data->newPass);

  try {

    $fetch_user_by_id = "SELECT * FROM `users` WHERE `id`=:id";
    $query_stmt = $conn->prepare($fetch_user_by_id);
    $query_stmt->bindValue(':id', $id, PDO::PARAM_STR);
    $query_stmt->execute();

    $row = $query_stmt->fetch(PDO::FETCH_ASSOC);
    $check_password = password_verify($oldPass, $row['password']);

    // VERIFYING THE PASSWORD (IS CORRECT OR NOT?)
    // IF PASSWORD IS CORRECT THEN SEND THE LOGIN TOKEN
    if ($check_password) :

      if (strlen($newPass) < 8) :
        $returnData = msg(0, 422, 'Ваш пароль должен быть не менее 8 символов!');

      else :
        try {

          $update_query = "UPDATE `users` SET `password`=:password WHERE `id`=:id";

          $update_stmt = $conn->prepare($update_query);

          // DATA BINDING
          $update_stmt->bindValue(':id', $id, PDO::PARAM_STR);
          $update_stmt->bindValue(':password', password_hash($newPass, PASSWORD_DEFAULT), PDO::PARAM_STR);

          $update_stmt->execute();

          $returnData = msg(1, 201, 'Пароль успешно изменён.');
        } catch (PDOException $e) {
          $returnData = msg(0, 500, $e->getMessage());
        }
      endif;

    // IF INVALID PASSWORD
    else :
      $returnData = msg(0, 422, 'Неверный пароль!');
    endif;
  } catch (PDOException $e) {
    $returnData = msg(0, 500, $e->getMessage());
  }

endif;

echo json_encode($returnData);
