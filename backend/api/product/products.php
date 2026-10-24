<?php 

require_once __DIR__ . "/../../settings/auth_guard.php";
require_once __DIR__ . "/../../settings/cors_header.php";
require_once __DIR__ . "/../../crud/product_crud/product.php";
require_once __DIR__ . "/../../authentication.php";
require_once __DIR__ . "/../../crud/user_crud/admin.php";

header("Content-Type:application/json");

require_permission("view.products", $base_auth, $base_admin);

$products = $base_product->products();
http_response_code(200);
echo json_encode(["products" => $products]);



?>