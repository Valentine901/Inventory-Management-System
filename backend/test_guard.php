<?php 

const PERMISSIONS = [
    "admin" => ["staff.manage"],
    "staff" => ["product.view"]
];

function can(string $role, string $permission): bool {
    return in_array($permission, PERMISSIONS[$role], true);
}

$user = $_SESSION["user"];

if (!$can($user["role"], "manage.staff")){}

?>