<?php 

require_once __DIR__ . "/config.php";

class ProductImageUploader {
    private BackgroundRemover $remover;
    private string $uploadDirectory;

    public function __construct(BackgroundRemover $remover, string $uploadDirectory){
        $this->remover = $remover;
        $this->uploadDirectory = $uploadDirectory;
    }

    public function processOne(array $file): string {
        $processor = new FileProcessor($file, $this->uploadDirectory);

        $processor->checkUploadError();
        $mimeType = $processor->getMimeType();
        $processor->validateMimeType($mimeType);

        $edited = $this->remover->remove($processor->getTmpPath());

        $filename = $processor->generateFilename("image/png");

        $processor->saveContents($edited, $filename);
        return $filename;
    }

    public function processManyFiles(array $files): array{
        $savedFilenames = [];

        try{
            foreach ($files as $file) {
                $savedFilenames[] = $this->processOne($file);
            }
        } catch (Exception $e) {
            // if image 3 fails, images 1 and 2 are already saved, delete them so we don't leave orphan files behind
            foreach($savedFilenames as $filename){
                @unlink($this->uploadDirectory . "/" .$filename);
                throw $e;
            }
        }
        return $savedFilenames;
    }
}

?>