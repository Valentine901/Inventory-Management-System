<?php 

require_once __DIR__ . "/../../settings/database.php";


class BaseCategory{
    private $conn;

    public function __construct($conn){
        $this->conn = $conn;
    }

    public function create(string $name): bool{
        $sql = "INSERT INTO categories (name) VALUES (:name)";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(["name" => $name]);
        return true;
    }

    public function get_category(int $id) {
        $sql = "SELECT * FROM categories WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(["id"=>$id]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result;
    }

    public function get_categories(){
        $sql = "SELECT * FROM categories";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result ? $result : [];
    }

    public function delete(int $id): bool {
        $sql = "DELETE FROM categories WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(["id"=>$id]);
        return true;
    }
}

$base_category = new BaseCategory($connection_db);

?>