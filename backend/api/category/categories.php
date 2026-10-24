<?php 
require_once __DIR__ . "/../../settings/cors_header.php";
require_once __DIR__ . "/../../crud/category_crud/category.php";
require_once __DIR__ . "/../../settings/auth_guard.php";
require_once __DIR__ . "/../../crud/user_crud/admin.php";
require_once __DIR__ . "/../../authentication.php";
require_once __DIR__ . "/../../settings/response.php";

header("Content-Type: application");

require_permission("view.categories", $base_auth, $base_admin);

$categories = $base_category->get_categories();
http_response_code(200);
echo json_encode(["categories" => $categories]);
exit();

?>