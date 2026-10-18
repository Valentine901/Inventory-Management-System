<?php 
require_once __DIR__ . "/../../settings/cors_header.php";
require_once __DIR__ . "/../../authentication.php";
require_once __DIR__ . "/../../crud/user_crud/admin.php";
require_once __DIR__ . "/../../crud/user_crud/staff.php";

header("Content-Type: application/json");



if (!isset($_COOKIE["access_token"])) {
    http_response_code(401);
    echo json_encode(["message" => "Access token missing"]);
    exit();
}

$payload = $base_auth -> decode_token($_COOKIE["access_token"]);
// $admin = $base_admin -> get_admin($payload -> email);
// if (!$admin) {
//     http_response_code(404);
//     echo json_encode(["message" => "User not found"]);
//     exit();
// }

$user_id = (int)$payload->user_id;
$user = $base_admin->get_user_by_id_and_role($user_id, $payload->role);

if (!$user) {
    http_response_code(404);
    echo json_encode(["message" => "User not found"]);
    exit();
}

http_response_code(200);
echo json_encode(["data" => [
    "user_id" => $payload -> user_id,
    "email" => $payload -> email,
    "username" => $payload -> username,
    "role" => $payload -> role
]]);
exit()




?>