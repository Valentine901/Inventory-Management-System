<?php 
require_once __DIR__ . "/response.php";

function check_data(){
    $data = json_decode("php://input", true);
    if (!$data) {
        json_error(400, "Invalid Json format");
    }
}

?>