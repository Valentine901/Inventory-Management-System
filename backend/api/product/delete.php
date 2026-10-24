<?php 

require_once __DIR__ . "/../../settings/cors_header.php";
require_once __DIR__ . "/../../crud/product_crud/product.php";
require_once __DIR__ . "/../../settings/auth_guard.php";
require_once __DIR__ . "/../../crud/user_crud/admin.php";
require_once __DIR__ . "/../../authentication.php";
require_once __DIR__ . "/../../settings/response.php";
require_once __DIR__ . "/../../settings/cors_header.php";


header("Content-Type: application");

require_permission("delete.product", $base_auth, $base_admin);



if(!isset($_GET["product_id"])) {
    json_error(400, "Product id missing");
}

$product_id = $_GET['product_id'];

$product = $base_product->getProduct($product_id);

if (!$product) {
    json_error(404, "Product not found");
}

$is_deleted = $base_product->delete($product_id);

if (!$is_deleted) {
    json_error(500, "Failed to delete product");
}

http_response_code(200);
echo json_encode(["message" => "Product deleted"]);
exit()

?>