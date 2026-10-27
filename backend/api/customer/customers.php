<?php 

require_once __DIR__ . "/../../crud/customer_crud/customer.php";
require_once __DIR__ . "/../../crud/user_crud/admin.php";
require_once __DIR__ . "/../../settings/cors_header.php";
require_once __DIR__ . "/../../settings/auth_guard.php";
require_once __DIR__ . "/../../authentication.php";
require_once __DIR__ . "/../../settings/response.php";

header("Content-Type: application/json");

require_permission("view.customers", $base_auth, $base_admin);

$page = isset($_GET["page"]) ? (int)$_GET["page"] : 1;
$limit = isset($_GET["limit"]) ? (int)$_GET["limit"] : 4;
$offset = ($page - 1) * $limit;

$response = $base_customer->customers($limit, $offset);

http_response_code(200);
echo json_encode([
    "data" => $response["customers"],
    "totalCustomer" => $response["totalCustomer"]
]);

?>