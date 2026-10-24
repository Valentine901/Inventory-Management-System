<?php 

require_once __DIR__ . "/../../settings/cors_header.php";
require_once __DIR__ . "/../../crud/supplier_crud/supplier.php";
require_once __DIR__ . "/../../settings/auth_guard.php";
require_once __DIR__ . "/../../crud/user_crud/admin.php";
require_once __DIR__ . "/../../authentication.php";
require_once __DIR__ . "/../../settings/response.php";


header("Content-Type: application/json");

// permission check
require_permission("create.supplier", $base_auth, $base_admin);

$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    json_error(400, "Invalid Json format");
};

if(empty($data["username"]) || empty($data["email"]) || empty($data["company"])){
    json_error(400, "All fields are required");
}

$username = trim($data["username"]);
$email = trim($data["email"]);
$company = trim($data["company"]);


$is_created = $base_supplier->create($username, $company, $email);
if (!$is_created){
    json_error(500, "Failed to create supplier");
}

http_response_code(201);
echo json_encode(["message" => "New supplier created"])



?>