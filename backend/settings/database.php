<?php 

require_once __DIR__ . "/config.php";

class DatabaseEngine{
    private $config;
    public function __construct($config){
        $this -> config = $config;
    }

    public function get_connection(){
        try{
            $host = $this->config->DB_HOST;
            $dbname = $this->config->DB_NAME;
            $user = $this->config->DB_USER;
            $pass = $this->config->DB_PASS;

            $dsn = "mysql:host=$host;dbname=$dbname";

            $conn = new PDO($dsn, $user, $pass); 

            $conn -> setAttribute(
                PDO::ATTR_ERRMODE, 
                PDO::ERRMODE_EXCEPTION
            );

            // echo "Connected successfully";
            return $conn;
        } catch (PDOException $e) {
            echo $e -> getMessage();
        }
    }
}

$connection = new DatabaseEngine($config);
$connection_db = $connection -> get_connection();


?>