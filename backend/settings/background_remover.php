<?php 

class BackgroundRemover {
    // The secret key for making request to the API
    private string $apiKey;

    // The api address we send the image
    private string $endpoint = "https://api.remove.bg/v1.0/removebg";

    public function __construct(string $apiKey) {
        $this->apiKey = $apiKey;
    }

    public function remove(string $imagePath): string {
        // curl is PHP's tool for sending requests to other servers
        $ch = curl_init($this->endpoint);

        curl_setopt_array($ch, [
            // Send as a POST request
            CURLOPT_POST => true,

            // The header carries our key so the API knows who is making request
            CURLOPT_HTTPHEADER => ["X-api-Key: " . $this->apiKey],

            // The body: CURLFile attaches the actual image file to the reqest
            CURLOPT_POSTFIELDS => [
                "image_file" => new CURLFile($imagePath),
                "size" => "auto",
            ],

            // give the processed image back as value instead of printing
            CURLOPT_RETURNTRANSFER => true,
        ]);

        // send the request and wait for the response
        $response = curl_exec($ch);

        $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        curl_close($ch);

        if ($response === false || $statusCode !== 200) {
            throw new Exception("Background removal failed (status code: $statusCode)");
        }

        // If everything went okay return the response 
        return $response;
    }

}


?>