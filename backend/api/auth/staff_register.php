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

if (empty($data["username"]) || empty($data["email"]) || empty($data["member_id"]) || empty($data["password"])){
    http_response_code(400);
    echo json_encode(["message" =>  "All fields are required"]);
    exit();
}


if (!filter_var($data["email"], FILTER_VALIDATE_EMAIL)){
    http_response_code(400);
    echo json_encode(["message" =>  "Invalid email address"]);
    exit();
}

$staff_member = $base_staff->get_staff($data["member_id"]);
if ($staff_member) {
    http_response_code(400);
    echo json_encode(["message" =>  "Staff member already existed"]);
    exit();
}

$password = $base_auth -> hash_password($data["password"]);
$username = $data["username"];
$email = $data["email"];
$member_id = $data["member_id"];

$is_created = $base_staff -> create(username:$username, email:$email, member_id:$member_id, password:$password);

if (!$is_created){
    http_response_code(400);
    echo json_encode(["message" => "Failed to add staff member"]);
    exit();
}
http_response_code(201);
echo json_encode(["message" =>  "New staff created"]);
exit();


?>