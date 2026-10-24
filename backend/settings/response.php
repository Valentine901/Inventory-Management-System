<?php 

function json_error(int $status, string $message) {
    http_response_code($status);
    echo json_encode(["message" => $message]);
    exit();
}


?>