<?php 
require_once __DIR__ . "/../../settings/cors_header.php";
require_once __DIR__ . "/../../crud/supplier_crud/supplier.php";
require_once __DIR__ . "/../../settings/auth_guard.php";
require_once __DIR__ . "/../../crud/user_crud/admin.php";
require_once __DIR__ . "/../../authentication.php";
require_once __DIR__ . "/../../settings/response.php";

header("Content-Type: application");

require_permission("view.suppliers", $base_auth, $base_admin);

$limit = isset($_GET["limit"]) ? (int)$_GET['limit'] : 4;
$currentPage = isset($_GET["page"]) ? (int)$_GET["page"] : 1;

$offset = ($currentPage - 1) * $limit;

$response = $base_supplier->get_suppliers($limit, $offset);
http_response_code(200);
echo json_encode(["suppliers" => $response["suppliers"], "total_suppliers" => $response["total_suppliers"]]);
exit();

?>