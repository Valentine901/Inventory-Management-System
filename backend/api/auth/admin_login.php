<?php 
require_once __DIR__ . "/../../settings/cors_header.php";
require_once __DIR__ . "/../../authentication.php";
require_once __DIR__ . "/../../crud/user_crud/admin.php";
require_once __DIR__ . "/../../vendor/autoload.php";

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data)) {
    http_response_code(400);
    echo json_encode(["message" =>  "Invalid JSON format"]);
    exit();
}

if (empty($data["email"]) || empty($data["password"])){
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
if (!$admin || !$base_auth-> verify_password($data["password"], $admin["password"])) {
    http_response_code(401);
    echo json_encode(["message" =>  "Invalid credentials"]);
    exit();
}

$access_payload = [
    "user_id" => $admin['id'],
    "username" => $admin["username"],
    "email" => $admin["email"],
    "role" => $admin["role"],
    "is_active" => $admin["is_active"],
    "iat" => time(),
    "exp" => time() + (3600 * 24)
];

$refresh_payload = [
    "user_id" => $admin['id'],
    "username" => $admin["username"],
    "email" => $admin["email"],
    "role" => $admin["role"],
    "is_active" => $admin["is_active"],
    "iat" => time(),
    "exp" => time() + (60 * 60 * 24 * 7)
];

$access_token = $base_auth -> create_token($access_payload);
$refresh_token = $base_auth -> create_token($refresh_payload);

setcookie("access_token", $access_token, ["expires" => time() + (60 * 60 * 24), "secure" => false, "httponly" => true, "path" => "/"]);
setcookie("refresh_token", $refresh_token, ["expires" => time() + (60 * 60 * 24 * 7), "secure" => false, "httponly" => true, "path" => "/"]);

http_response_code(200);
echo json_encode(["message" => [
    "id" => $admin["id"],
    "role" => $admin["role"],
    "email" => $admin["email"],
]]);
exit();


?>