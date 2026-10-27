<?php 

require_once __DIR__ . "/../settings/cors_header.php";
require_once __DIR__ . "/../settings/auth_guard.php";
require_once __DIR__ . "/../crud/user_crud/admin.php";
require_once __DIR__ . "/../authentication.php";
require_once __DIR__ . "/../settings/database.php";

header("Content-Type: application");

require_permission("view.stat", $base_auth, $base_admin);

$productQuery = "SELECT COUNT(*) FROM products";
$productStmt = $connection_db->prepare($productQuery);
$productStmt->execute();
$totalProduct = $productStmt->fetchColumn();

$supplierQuery = "SELECT COUNT(*) FROM suppliers";
$supplierStmt = $connection_db->prepare($supplierQuery);
$supplierStmt->execute();
$totalSupplier = $supplierStmt->fetchColumn();

$customerQuery = "SELECT COUNT(*) FROM customers";
$customerStmt = $connection_db->prepare($customerQuery);
$customerStmt->execute();
$totalCustomer = $customerStmt->fetchColumn();

$staffQuery = "SELECT COUNT(*) FROM users WHERE role=:role";
$staffStmt = $connection_db->prepare($staffQuery);
$staffStmt->execute(["role" => "staff"]);
$totalStaff = $staffStmt->fetchColumn();

echo json_encode([
    "totalStaff" => (int)$totalStaff,
    "totalProduct" => (int)$totalProduct,
    "totalSupplier" => (int)$totalSupplier,
    "totalCustomer" => (int)$totalCustomer,
]);
?>