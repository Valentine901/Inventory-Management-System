<?php

require_once __DIR__ . "/../../settings/database.php";


class BaseSupplier
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function create(string $username, string $company, string $email): bool
    {

        $sql = "INSERT INTO suppliers (supplier_name, company_name, email) VALUES (:supplier_name, :company_name, :email)";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(["supplier_name" => $username, "company_name" => $company, "email" => $email]);
        return true;
    }

    public function get_supplier(int $id)
    {
        $sql = "SELECT * FROM suppliers WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(["id" => $id]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result;
    }

    public function get_suppliers()
    {
        $sql = "SELECT * FROM suppliers ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result ? $result : [];
    }

    public function delete_supplier(int $id): bool
    {
        $sql = "DELETE FROM suppliers WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(["id" => $id]);
        return true;
    }
    public function update_supplier(int $id, string $username, string $company, string $email): bool
    {
        $sql = "UPDATE suppliers SET supplier_name=:supplier_name, company_name=:company_name, email=:email WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(["id" => $id, "supplier_name" => $username, "company_name" => $company, "email" => $email]);
        return true;
    }
}

$base_supplier = new BaseSupplier($connection_db);
