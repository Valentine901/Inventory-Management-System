<?php

require_once __DIR__ . "/../settings/response.php";

function normalizeFiles(array $files): array
{
    $cards = [];
    for ($i = 0; $i < count($files["name"]); $i++) {
        $cards[] = [
            "name" => $files["name"][$i],
            "type" => $files["type"][$i],
            "tmp_name" => $files["tmp_name"][$i],
            "error" => $files["error"][$i],
            "size" => $files["size"][$i]
        ];
    }

    return $cards;
}


class FileProcessor
{
    private array $image;
    private string $uploadDirectory;
    private array $allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ];

    public function __construct(array $image, string $uploadDirectory)
    {
        $this->image = $image;
        $this->uploadDirectory = rtrim($uploadDirectory, "/") . '/';
    }

    public function getTmpPath(): string {
        // it returns temporal location of the file
        return $this->image["tmp_name"];
    }
    public function checkUploadError(): void
    {
        if ($this->image["error"] !== UPLOAD_ERR_OK) {
            json_error(400, "Image failed to upload");
        }
    }
    
    public function generateFilename($path): string{
        $extension = match($path) {
            "image/png" => "png",
            "image/jpeg" => "jpg",
            "image/webp" => "webp",
        };
        $unique_filename = uniqid("image_", true);
        $file_path = $unique_filename .".".$extension;
        return $file_path;
    }

    // returns the type of file e.g., image/png or jpeg
    public function getMimeType(): string
    {
        $fileInfo = new finfo(FILEINFO_MIME_TYPE);
        return $fileInfo->file($this->image["tmp_name"]);
    }

    public function validateMimeType(string $mimeType): void
    {
        if (!in_array($mimeType, $this->allowedTypes, true)) {
            http_response_code(400);
            echo json_encode([
                "message" => "Only JPG, PNG and WEBP images are allowed"
            ]);

            exit();
        }
    }


    // moves file from temporal location to permanent location
    public function moveFile(string $filename): string
    {
        if (!move_uploaded_file($this->image["tmp_name"], $this->uploadDirectory.$filename)){
            json_error(500, "Failed to save uploaded file");
        }

        return $filename;
    }

    public function saveContents(string $contents, string $filename): string{
        if (file_put_contents($this->uploadDirectory . $filename, $contents) === false) {
            json_error(500, "Failed to save processed image");
        }
        return $filename;
    }
}
