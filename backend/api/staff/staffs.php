<?php 
require_once __DIR__ . "/../../crud/user_crud/staff.php";
require_once __DIR__ . "/../../settings/cors_header.php";

$currentPage = isset($_GET["page"]) ? (int)$_GET["page"] : 1;
$limit = isset($_GET["limit"]) ? (int)$_GET["limit"] : 6;


$offset = ($currentPage - 1) * $limit;


$response = $base_staff->get_staffs($limit, $offset);
http_response_code(200);
echo json_encode(["data" => $response["data"], "totalStaffs" => $response["totalStaffs"]]);
exit();

?>