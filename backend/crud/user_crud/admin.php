<?php 

require_once __DIR__ . "/../../settings/database.php";


class BaseAdmin{
    private $conn;

    public function __construct($conn){
        $this -> conn = $conn;
    }

    public function create(string $username, string $email,  string $password): bool{
        $sql = "INSERT INTO users (username, email, role, password, is_active) VALUES (:username, :email, :role, :password, :is_active)";
        $statement = $this -> conn -> prepare($sql);
        $statement -> execute([
            "username" => $username,
            "email" => $email,
            "role" => "admin",
            "is_active" => true,
            "password" => $password
        ]);
        return true;
    }


    public function get_admin(string $email){
        $sql = "SELECT * FROM users WHERE email = :email AND role = :role";
        $statement = $this -> conn -> prepare($sql);
        $statement -> execute(["email" => $email, "role" => "admin"]);
        $result = $statement -> fetch(PDO::FETCH_ASSOC);
        return $result ? $result : false;
    }

    public function get_admin_by_id(int $id){
        $sql = "SELECT * FROM users WHERE id = :id AND role = :role";
        $statement = $this -> conn -> prepare($sql);
        $statement -> execute(["id" => $id, "role" => "admin"]);
        $result = $statement -> fetch(PDO::FETCH_ASSOC);
        return $result ? $result : false;
    }

    public function get_user_by_id_and_role(int $id, string $role){
        $sql = "SELECT * FROM users WHERE id = :id AND role = :role";
        $statement = $this -> conn -> prepare($sql);
        $statement -> execute(["id" => $id, "role" => $role]);
        $result = $statement -> fetch(PDO::FETCH_ASSOC);
        return $result ? $result : false;
    }
}

$base_admin = new BaseAdmin($connection_db);

?>