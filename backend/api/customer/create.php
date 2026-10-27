<?php 

require_once __DIR__ . "/../../crud/customer_crud/customer.php";
require_once __DIR__ . "/../../crud/user_crud/admin.php";
require_once __DIR__ . "/../../settings/cors_header.php";
require_once __DIR__ . "/../../settings/auth_guard.php";
require_once __DIR__ . "/../../authentication.php";
require_once __DIR__ . "/../../settings/response.php";

header("Content-Type: application/json");

require_permission("create.customer", $base_auth, $base_admin);

$data = json_decode(file_get_contents("php://input"), true);

if (!$data){
    json_error(400, "Invalid json format");
}

if (empty($data["full_name"]) || empty($data["phone"]) || empty($data["address"])) {
    json_error(400, "All fields is required");
}

$full_name = trim($data["full_name"]);
$phone = trim($data["phone"]);
$address = trim($data["address"]);

$is_created = $base_customer->create($full_name, $phone, $address);

if (!$is_created) {
    json_error(500, "Failed to created customer");
}

http_response_code(201);
echo json_encode(["message" => "customer created"])



?>