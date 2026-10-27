<?php 

const PERMISSIONS = [
    "admin" => ["staff.manage", "product.view", "create.category", "update.category", "view.categories", "delete.category", "create.product", "update.product", "view.products", "delete.product", "view.product", "create.supplier", "update.supplier", "view.suppliers", "view.supplier", "delete.supplier", "view.stat", "create.customer", "update.customer", "delete.customer", "view.customer", "view.customers"],

    "staff" => ["product.view", "view.categories", "view.products", "view.product", "view.suppliers", "view.supplier", "view.customer", "view.customers"]
];

function can(string $role, string $permission): bool {
    return in_array($permission, PERMISSIONS[$role] ?? [], true);
}


?>