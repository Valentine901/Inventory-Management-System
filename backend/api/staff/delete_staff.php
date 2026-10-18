<?php 

require_once __DIR__ . "/../../crud/user_crud/staff.php";
require_once __DIR__ . "/../../settings/cors_header.php";


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

$is_deleted = $base_staff->delete_staff($member_id);
if (!$is_deleted){
    http_response_code(500);
    echo json_encode(["message" => "Couldn't delete staff member"]);
    exit();
}

http_response_code(200);
echo json_encode(["message" => "Staff deleted succcessfully"]);
exit();


?>