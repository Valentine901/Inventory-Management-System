<?php 

require_once __DIR__ . "/../../crud/customer_crud/customer.php";
require_once __DIR__ . "/../../crud/user_crud/admin.php";
require_once __DIR__ . "/../../settings/cors_header.php";
require_once __DIR__ . "/../../settings/auth_guard.php";
require_once __DIR__ . "/../../authentication.php";
require_once __DIR__ . "/../../settings/response.php";

header("Content-Type: application/json");

require_permission("update.customer", $base_auth, $base_admin);

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($_GET["customer_id"])){
    json_error(400, "Customer ID missing in the request");
}


if (!$data){
    json_error(400, "Invalid json format");
}

if (empty($data["full_name"]) || empty($data["phone"]) || empty($data["address"])) {
    json_error(400, "All fields is required");
}

$customer_id = (int)$_GET["customer_id"];
$full_name = trim($data["full_name"]);
$phone = trim($data["phone"]);
$address = trim($data["address"]);

$customer = $base_customer->get($customer_id);
if (!$customer){
    json_error(404, "Customer not found");
}

$is_updated = $base_customer->update($customer_id, $full_name, $phone, $address);

if (!$is_updated) {
    json_error(500, "Failed to update customer");
}

http_response_code(200);
echo json_encode(["message" => "customer updated"])



?>