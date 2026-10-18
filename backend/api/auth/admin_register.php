<?php 
require_once __DIR__ . "/../../settings/cors_header.php";
require_once __DIR__ . "/../../crud/user_crud/admin.php";
require_once __DIR__ . "/../../authentication.php";

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data)) {
    http_response_code(400);
    echo json_encode(["message" =>  "Invalid JSON format"]);
    exit();
}

if (empty($data["username"]) || empty($data["email"]) || empty($data["password"])){
    http_response_code(400);
    echo json_encode(["message" =>  "All fields are required"]);
    exit();
}

if (!filter_var($data["email"], FILTER_VALIDATE_EMAIL)){
    http_response_code(400);
    echo json_encode(["message" =>  "Invalid email address"]);
    exit();
}

$admin = $base_admin -> get_admin($data["email"]);
if ($admin) {
    http_response_code(400);
    echo json_encode(["message" =>  "Admin already existed"]);
    exit();
}

$password = $base_auth -> hash_password($data["password"]);
$username = $data["username"];
$email = $data["email"];

$is_created = $base_admin -> create(username:$username, email:$email, password:$password);

if (!$is_created){
    http_response_code(400);
    echo json_encode(["message" => "Failed to create admin"]);
    exit();
}

http_response_code(201);
echo json_encode(["message" =>  "New Admin created"]);
exit();

?>