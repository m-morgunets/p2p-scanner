<?php
class Database
{

    // CHANGE THE DB INFO ACCORDING TO YOUR DATABASE
    // private $db_host = 'localhost';
    // private $db_name = 'u1655934_p2p';
    // private $db_username = 'u1655934_default';
    // private $db_password = 'qeqRlSET97uR8m1z';

    private $db_host = 'localhost';
    private $db_name = 'p2p';
    private $db_username = 'root';
    private $db_password = 'root';

    public function dbConnection()
    {

        try {
            $conn = new PDO('mysql:host=' . $this->db_host . ';dbname=' . $this->db_name, $this->db_username, $this->db_password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            return $conn;
        } catch (PDOException $e) {
            echo "Connection error " . $e->getMessage();
            exit;
        }
    }
}
