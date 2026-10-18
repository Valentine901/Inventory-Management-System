<?php
require_once __DIR__ . "/../../settings/cors_header.php";
require_once __DIR__ . "/../../crud/user_crud/staff.php";


$data = json_decode(file_get_contents("php://input"), true); 


if(!$data) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid JSON format"]);
    exit();
}


if (empty($data["member_id"]) || empty($data["username"]) || empty($data["email"]) || empty($data["role"])) {
    http_response_code(400);
    echo json_encode(["message"=> "All fields are required"]);
    exit();
}

$username  = trim($data["username"]);
$email     = trim($data["email"]);
$role      = trim($data["role"]);
$member_id = trim($data["member_id"]);

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid email address"]);
    exit();
}

if (!in_array($role, ["staff", "admin"], true)) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid role"]);
    exit();
}

$staff = $base_staff->get_staff($member_id);

if (!$staff) {
    http_response_code(404);
    echo json_encode(["message" => "Staff member not found"]);
    exit();
}

$is_updated = $base_staff->update_staff($member_id, $username, $email, $role);

if (!$is_updated){
    http_response_code(500);
    echo json_encode(["message" => "Couldn't update staff member"]);
    exit();
}

http_response_code(200);
echo json_encode(["message" => "Staff updated succcessfully"]);
exit();


?>