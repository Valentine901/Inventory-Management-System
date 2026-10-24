<?php 
require_once __DIR__ . "/../../settings/cors_header.php";
require_once __DIR__ . "/../../crud/category_crud/category.php";
require_once __DIR__ . "/../../settings/auth_guard.php";
require_once __DIR__ . "/../../crud/user_crud/admin.php";
require_once __DIR__ . "/../../authentication.php";
require_once __DIR__ . "/../../settings/response.php";

header("Content-Type: application");

require_permission("view.categories", $base_auth, $base_admin);

if(!isset($_GET["category_id"])) {
    json_error(400, "Category id missing");
}

$category_id = $_GET['category_id'];

$category = $base_category->get_category($category_id);

if (!$category) {
    json_error(404, "Category not found");
}


http_response_code(200);
echo json_encode(["id" => $category["id"], "name" => $category["name"]]);
exit()


?>