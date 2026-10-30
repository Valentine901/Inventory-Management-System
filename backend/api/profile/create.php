<?php 

require_once __DIR__ . "/../../settings/cors_header.php";
require_once __DIR__ . "/../../crud/profile_crud";
require_once __DIR__ . "/../../authentication.php";
require_once __DIR__ . "/../../settings/validate_files.php";

header("Content-Type: application/json");

if(!isset($_COOKIE["access_token"])){
    json_error(401, "Unauthenticated, sign in to perform this action");
}

$token = $_COOKIE["access_token"];
$payload = $base_auth->decode_token($token);
$user_id = (int)$payload->user_id;

if(!isset($_FILES["image"])){
    json_error(400, "Profile image must be included");
}

$first_name = (string)$_POST['first_name'];
$last_name = (string)$_POST['last_name'];


$process_file = new FileProcessor($_FILES["image"], "/../../images/profile");
$process_file->checkUploadError();
$mimeType = $process_file->getMimeType();
$process_file->validateMimeType($mimeType);
$filename = $process_file->generateFilename($mimeType);

$is_created = $base_profile->create($first_name, $last_name, $filename, $user_id);
if (!$is_created){
    json_error(500, "Failed to create profile");
}


http_response_code(201);
echo json_encode(["message" => "Profile created success!"]);
exit();

?>