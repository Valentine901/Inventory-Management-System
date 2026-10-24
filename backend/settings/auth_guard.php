<?php 

require_once __DIR__ . "/response.php";
require_once __DIR__ . "/permissions.php";
require_once __DIR__ . "/../authentication.php";
require_once __DIR__ . "/../crud/user_crud/admin.php";
require_once __DIR__ . "/../vendor/autoload.php";


function current_user($base_auth, $base_user): ?array {
    if (!$_COOKIE["access_token"]){
        json_error(401, "Please log in");
    }

    $token = $_COOKIE["access_token"];
    $payload = $base_auth->decode_token($token);
    $user_id = (int)$payload -> user_id;
    $user = $base_user->get_user_by_id($user_id);
    return $user;
}


function require_permission(string $permission, $base_auth, $base_user): array{
    $user = current_user($base_auth, $base_user);

    if (!$user) {
        json_error(401, "Please log in");
    }

    if (!can($user["role"], $permission)){
        json_error(403, "You are not allowed to do this");
    }
    return $user;
}

?>