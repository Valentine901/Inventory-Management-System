<?php 
require_once __DIR__ . "/../../settings/cors_header.php";
require_once __DIR__ . "/../../crud/supplier_crud/supplier.php";
require_once __DIR__ . "/../../settings/auth_guard.php";
require_once __DIR__ . "/../../crud/user_crud/admin.php";
require_once __DIR__ . "/../../authentication.php";
require_once __DIR__ . "/../../settings/response.php";

header("Content-Type: application");

require_permission("delete.supplier", $base_auth, $base_admin);

if(!isset($_GET["supplier_id"])){
    json_error(400, "Supplier ID not included in request");
}

$supplier_id = $_GET["supplier_id"];

$supplier = $base_supplier->get_supplier($supplier_id);
if (!$supplier){
    json_error(404, "Supplier not found");
}

$is_deleted = $base_supplier->delete_supplier($supplier_id);
if (!$is_deleted){
    json_error(500, "Failed to delete supplier");
}

http_response_code(200);
echo json_encode(["message" => "Supplier deleted successfully"]);
exit();

?>