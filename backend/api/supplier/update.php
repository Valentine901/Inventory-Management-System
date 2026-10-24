<?php 
require_once __DIR__ . "/../../settings/cors_header.php";
require_once __DIR__ . "/../../crud/supplier_crud/supplier.php";
require_once __DIR__ . "/../../settings/auth_guard.php";
require_once __DIR__ . "/../../crud/user_crud/admin.php";
require_once __DIR__ . "/../../authentication.php";
require_once __DIR__ . "/../../settings/response.php";

header("Content-Type: application");

require_permission("update.supplier", $base_auth, $base_admin);

$data = json_decode(file_get_contents("php://input"), true);

if (!$data){
    json_error(400, "Invalid JSON request");
}

if(!isset($_GET["supplier_id"])){
    json_error(400, "Supplier ID not included in request");
}

if (empty($data["username"]) || empty($data["email"]) || empty($data["company"])){
    json_error(400, "All fields are required");
}

$supplier_id = $_GET["supplier_id"];

$supplier = $base_supplier->get_supplier($supplier_id);
if (!$supplier){
    json_error(404, "Supplier not found");
}

$username = trim($data["username"]);
$email = trim($data["email"]);
$company = trim($data["company"]);


$is_updated = $base_supplier->update_supplier($supplier_id, $username, $company, $email);
if (!$is_updated) {
    json_error(500, "Failed to update supplier");
}

http_response_code(200);
echo json_encode(["message" => "Supplier updated successfully"]);
exit();

?>