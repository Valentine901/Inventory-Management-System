<?php

require_once __DIR__ . "/../../settings/cors_header.php";
require_once __DIR__ . "/../../crud/user_crud/staff.php";
require_once __DIR__ . "/../../authentication.php";

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data)) {
    http_response_code(400);
    echo json_encode(["message" =>  "Invalid JSON format"]);
    exit();
}

if (empty($data["member_id"]) || empty($data["password"])) {
    http_response_code(400);
    echo json_encode(["message" =>  "All fields are required"]);
    exit();
}

$staff_member = $base_staff->get_staff($data["member_id"]);
if (!$staff_member || !$base_auth->verify_password($data["password"], $staff_member["password"])) {
    http_response_code(404);
    echo json_encode(["message" => "Invalid credentials"]);
    exit();
}

$is_active = $base_staff->update_staff_status($staff_member["member_id"]);

$access_payload = [
    "user_id" => $staff_member['id'],
    "username" => $staff_member["username"],
    "email" => $staff_member["email"],
    "role" => $staff_member["role"],
    "is_active" => $staff_member["is_active"],
    "iat" => time(),
    "exp" => time() + (3600 * 24)
];

$refresh_payload = [
    "user_id" => $staff_member['id'],
    "username" => $staff_member["username"],
    "email" => $staff_member["email"],
    "role" => $staff_member["role"],
    "is_active" => $staff_member["is_active"],
    "iat" => time(),
    "exp" => time() + (3600 * 24 * 7)
];

$access_token = $base_auth->create_token($access_payload);
$refresh_token = $base_auth->create_token($refresh_payload);

setcookie("access_token", $access_token, ["expires" => time() + (60 * 60 * 24), "secure" => false, "httponly" => true, "path" => "/"]);
setcookie("refresh_token", $refresh_token, ["expires" => time() + (60 * 60 * 24 * 7), "secure" => false, "httponly" => true, "path" => "/"]);



http_response_code(200);
echo json_encode(["member_metadata" => [
    "user_id" => $staff_member["id"],
    "member_id" => $staff_member["member_id"],
    "email" => $staff_member["email"],
    "username" => $staff_member["username"],
    "role" => $staff_member["role"],
    "is_active" => $staff_member["is_active"]
]]);

exit();
