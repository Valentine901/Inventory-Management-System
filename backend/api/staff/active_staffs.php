<?php 
require_once __DIR__ . "/../../crud/user_crud/staff.php";
require_once __DIR__ . "/../../settings/cors_header.php";

$currentPage = isset($_GET["page"]) ? (int)$_GET["page"] : 1;
$limit = isset($_GET["limit"]) ? (int)$_GET["limit"] : 6;


$offset = ($currentPage - 1) * $limit;

$active_staffs = $base_staff->get_staffs($limit, $offset, true);
http_response_code(200);
echo json_encode(["data" => $active_staffs["data"], "totalStaffs" => $active_staffs["totalStaffs"]]);
exit();

?>