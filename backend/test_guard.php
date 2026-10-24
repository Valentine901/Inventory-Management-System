<?php 

// const PERMISSIONS = [
//     "admin" => ["staff.manage"],
//     "staff" => ["product.view"]
// ];

// function can(string $role, string $permission): bool {
//     return in_array($permission, PERMISSIONS[$role], true);
// }

// $user = $_SESSION["user"];

// if (!can($user["role"], "staff.manage" ?? [])){}

$names = ["Ada", "Bola", "Chi"];
$ages = [10, 12, 11];

$cards = [];

for ($i = 0; $i < count($names); $i++) {
    $cards[] = [
        "name" => $names[$i],
        "age" => $ages[$i]
    ];

}

print_r($cards[0])

?>