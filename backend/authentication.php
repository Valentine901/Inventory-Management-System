<?php 
require_once __DIR__ . "/settings/config.php";
require_once __DIR__ . "/vendor/autoload.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


class BaseAuth{
    private $config;
    
    public function __construct($config){
        $this -> config = $config;
    }

    public function create_token($payload): string{
        $token = JWT::encode($payload, $this->config->SECRET_KEY, "HS256");
        return $token;
    }

    public function decode_token($token){
        try{
            $payload = JWT::decode($token, new Key($this-> config-> SECRET_KEY, "HS256"));
            return $payload;
        } catch (Exception $e) {
            
        }
    }

    public function hash_password($password): string {
        $hashed_pass = password_hash($password, PASSWORD_ARGON2I);
        return $hashed_pass;
    }


    public function verify_password($plain_password, $hashed_password): bool {
        $is_verified = password_verify($plain_password, $hashed_password);
        return $is_verified;
    }

}

$base_auth = new BaseAuth($config);

?>