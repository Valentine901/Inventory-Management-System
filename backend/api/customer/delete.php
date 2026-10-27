<?php 

require_once __DIR__ . "/../../crud/customer_crud/customer.php";
require_once __DIR__ . "/../../crud/user_crud/admin.php";
require_once __DIR__ . "/../../settings/cors_header.php";
require_once __DIR__ . "/../../settings/auth_guard.php";
require_once __DIR__ . "/../../authentication.php";
require_once __DIR__ . "/../../settings/response.php";

header("Content-Type: application/json");

require_permission("delete.customer", $base_auth, $base_admin);


if (!isset($_GET["customer_id"])){
    json_error(400, "Customer ID missing in the request");
}


$customer_id = (int)$_GET["customer_id"];

$customer = $base_customer->get($customer_id);
if (!$customer){
    json_error(404, "Customer not found");
}

$is_deleted = $base_customer->delete($customer_id);

if (!$is_deleted) {
    json_error(500, "Failed to delete customer");
}

http_response_code(204);
echo json_encode(["message" => "customer deleted"])



?>