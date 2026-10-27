<?php 

require_once __DIR__ . "/../../settings/auth_guard.php";
require_once __DIR__ . "/../../settings/cors_header.php";
require_once __DIR__ . "/../../crud/product_crud/product.php";
require_once __DIR__ . "/../../authentication.php";
require_once __DIR__ . "/../../crud/user_crud/admin.php";

header("Content-Type:application/json");

require_permission("view.products", $base_auth, $base_admin);

$limit = isset($_GET["limit"]) ?  (int)$_GET['limit'] : 4;
$page = isset($_GET["page"]) ? (int)$_GET["page"] : 1;

$offset = ($page - 1) * $limit;

$response = $base_product->products($limit, $offset);
http_response_code(200);
echo json_encode(["products" => $response["products"], "totalProduct" => $response["totalProduct"]]);



?>