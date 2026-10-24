<?php 

require_once __DIR__ . "/../../crud/product_crud/product.php";
require_once __DIR__ . "/../../authentication.php";
require_once __DIR__ . "/../../crud/user_crud/admin.php";
require_once __DIR__ . "/../../settings/cors_header.php";
require_once __DIR__ . "/../../settings/response.php";
require_once __DIR__ . "/../../settings/auth_guard.php";

header("Content-Type: application/json");
require_permission("update.product", $base_auth, $base_admin);

if (!isset($_GET["product_id"])){
    json_error(400, "Product ID is missing");
}

$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    json_error(400, "Invalid JSON request");
}
if (empty($data["name"]) || empty($data["price"]) || empty($data["quantity"]) || empty($data["category_id"]) || empty($data["supplier_id"])) {
    json_error(400, "All fields are required");
}

$product_id = $_GET["product_id"];
$name = $data["name"];
$price = $data["price"];
$quantity = $data["quantity"];
$category_id = $data["category_id"];
$supplier_id = $data["supplier_id"];

$product = $base_product->getProduct($product_id);

if (!$product){
    json_error(404, "Product not found");
}

$is_updated = $base_product->update($product_id, $name, $price, $quantity, $category_id, $supplier_id);
if (!$is_updated) {
    json_error(500, "Could not update product");
}

http_response_code(200);
echo json_encode(["message" => "Product updated success"]);
exit();


?>