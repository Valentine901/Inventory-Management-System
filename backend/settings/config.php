<?php 


$env = parse_ini_file(__DIR__ . "/../../.env");

if ($env === false){
    die("failed to get env data");
}

class Config{
    public string $DB_HOST;
    public string $DB_USER;
    public string $DB_PASS;
    public string $DB_NAME;
    public string $SECRET_KEY;
    public function __construct(array $env){
        $this -> DB_HOST = $env["DB_HOST"];
        $this -> DB_NAME = $env["DB_NAME"];
        $this -> DB_PASS = $env["DB_PASS"];
        $this -> DB_USER = $env["DB_USER"];
        $this -> SECRET_KEY = $env["SECRET_KEY"];
    }
}

$config = new Config($env);

?>