<?php
require_once __DIR__ . "/../../settings/cors_header.php";
require_once __DIR__ . "/../../authentication.php";
require_once __DIR__ . "/../../settings/database.php";
require_once __DIR__ . "/../../vendor/autoload.php";

header("Content-Type: application/json");



if (!isset($_COOKIE["refresh_token"])) {
    http_response_code(401);
    echo json_encode(["message" => "Refresh token missing"]);
    exit();
}

$payload = $base_auth->decode_token($_COOKIE["refresh_token"]);
$current_time = time();
$expired_at = $payload->exp;

if ($expired_at < $current_time) {

    $admin = $crud_admin->get_admin($payload->email);
    if (!$admin) {
        http_response_code(404);
        echo json_encode(["error" =>  "User not found"]);
        exit();
    }

    $access_payload = [
        "user_id" => $admin["id"],
        "role" => $admin["role"],
        "is_admin" => $admin["is_admin"],
        "email" => $admin["email"],
        "iat" => time(),
        "exp" => time() + (60 * 60 * 24)
    ];

    $refresh_payload = [
        "user_id" => $admin["id"],
        "role" => $admin["role"],
        "is_admin" => $admin["is_admin"],
        "email" => $admin["email"],
        "iat" => time(),
        "exp" => time() + (60 * 60 * 24 * 7)
    ];

    $access_token = $base_auth->create_token($access_payload);
    $refresh_token = $base_auth->create_token($refresh_payload);

    setcookie("access_token", $access_token, ["expires" => time() + (60 * 60 * 24), "secure" => false, "httponly" => true, "path" => "/"]);
    setcookie("refresh_token", $refresh_token, ["expires" => time() + (60 * 60 * 24 * 7), "secure" => false, "httponly" => true, "path" => "/"]);

    http_response_code(200);
    echo json_encode(["message" => "Token refreshed successfully"]);
    exit();
} else {
    http_response_code(401);
    echo json_encode(["message" => "Token expired, relogin to continue"]);
    exit();
}
