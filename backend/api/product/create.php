<?php 

require_once __DIR__ . "/../../settings/auth_guard.php";
require_once __DIR__ . "/../../settings/cors_header.php";
require_once __DIR__ . "/../../crud/product_crud/product.php";
require_once __DIR__ . "/../../settings/validate_files.php";
require_once __DIR__ . "/../../authentication.php";
require_once __DIR__ . "/../../crud/user_crud/admin.php";
require_once __DIR__ . "/../../settings/background_remover.php";
require_once __DIR__ . "/../../settings/config.php";
require_once __DIR__ . "/../../settings/product_img_uploader.php";

header("Content-Type: application/json");

require_permission("create.product", $base_auth, $base_admin);

if (empty($_FILES["images"])){
    json_error(400, "At least one image is required");
}


$files = normalizeFiles($_FILES["images"]);

$remover = new BackgroundRemover($config->BG_REMOVAL_API_KEY);
$uploader = new ProductImageUploader($remover,  __DIR__ . "/../../images/product");

$savedFilenames = $uploader->processManyFiles($files);

$base_product->create(
    $_POST["name"],
    (float) $_POST["price"],
    (int) $_POST["quantity"],
    (int)$_POST["category_id"],
    (int)$_POST["supplier_id"],
    $savedFilenames
);

echo json_encode(["message" => "Product created"]);

?>