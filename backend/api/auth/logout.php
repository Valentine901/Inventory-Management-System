<?php 

require_once __DIR__ . "/../../settings/config.php";
require_once __DIR__ . "/../../settings/response.php";
require_once __DIR__ . "/../../authentication.php";

header("Content-Type: application/json");
$base_auth->clear_token();
http_response_code(200);
echo json_encode([
    "message" =>  "Logout success!"
]);

?>