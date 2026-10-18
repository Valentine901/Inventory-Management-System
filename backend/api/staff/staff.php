<?php
require_once __DIR__ . "/../../settings/cors_header.php";
require_once __DIR__ . "/../../crud/user_crud/staff.php";

if(!isset($_GET["member_id"])) {
    http_response_code(400);
    echo json_encode(["message" => "Member ID missing"]);
    exit();
}

$member_id = $_GET['member_id'];

$staff = $base_staff->get_staff($member_id);

if (!$staff) {
    http_response_code(404);
    echo json_encode(["message" => "Staff member not found"]);
    exit();
}


http_response_code(200);
echo json_encode([
    "id" => $staff["id"],
    "member_id" => $staff["member_id"],
    "username" =>  $staff["username"],
    "email" => $staff["email"]
]);

exit();


?>