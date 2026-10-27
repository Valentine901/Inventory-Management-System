<?php 

require_once __DIR__ . "/../../settings/database.php";

class BaseCustomer {
    private PDO $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function create($fullname, $phone, $address) {
        $stmt = $this->conn->prepare("INSERT INTO customers (full_name, phone, address) VALUES (:full_name, :phone, :address)");
        $stmt->execute([
            "full_name" => $fullname,
            "phone" => $phone,
            "address" => $address
        ]);
        return true;
    }

    public function get($id){
        $stmt = $this->conn->prepare("SELECT * FROM customers WHERE id=:id");
        $stmt->execute(["id" => $id]);
        $customer = $stmt->fetch(PDO::FETCH_ASSOC);
        return $customer;
    }

    public function customers(int $limit, int $offset){
        $stmt = $this->conn->prepare("SELECT * FROM customers ORDER BY created_at DESC LIMIT :limit OFFSET :offset");
        $stmt->bindValue(":limit", (int)$limit, PDO::PARAM_INT);
        $stmt->bindValue(":offset", (int)$offset, PDO::PARAM_INT);
        $stmt->execute();
        $customers = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $countQuery = "SELECT COUNT(*) FROM customers";
        $countStmt = $this->conn->prepare($countQuery);
        $countStmt->execute();
        $totalCustomer = $countStmt->fetchColumn();

        return ["customers" => $customers, "totalCustomer" => $totalCustomer];
    }

    public function update($id, $fullname, $phone, $address): bool {
        $stmt = $this->conn->prepare("UPDATE customers SET full_name = :full_name, phone=:phone, address=:address WHERE id =:id");
        $stmt->execute([
            "id" => $id,
            "full_name" => $fullname,
            "phone" => $phone,
            "address" => $address
        ]);        
        return true;
    }

    public function delete($id): bool {
        $stmt = $this->conn->prepare("DELETE FROM customers WHERE id=:id");
        $stmt->execute([
            "id" => $id
        ]);
        return true;
    }
}

$base_customer = new BaseCustomer($connection_db);

?>