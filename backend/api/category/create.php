<?php 

require_once __DIR__ . "/../../settings/cors_header.php";
require_once __DIR__ . "/../../crud/category_crud/category.php";
require_once __DIR__ . "/../../settings/auth_guard.php";
require_once __DIR__ . "/../../crud/user_crud/admin.php";
require_once __DIR__ . "/../../authentication.php";
require_once __DIR__ . "/../../settings/response.php";


header("Content-Type: application/json");

// permission check
require_permission("create.category", $base_auth, $base_admin);

$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    json_error(400, "Invalid Json format");
}
$name = trim($data["name"]);

if (empty($name)){
    json_error(400, "Category name must not be empty");
}

$is_created = $base_category->create($name);
if (!$is_created){
    json_error(500, "Failed to create category");
}

http_response_code(201);
echo json_encode(["message" => "Category Created"]);

?>