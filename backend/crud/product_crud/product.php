<?php

require_once __DIR__ . "/../../settings/database.php";

class BaseProduct
{
    private PDO $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }


    public function create(string $name, float $price, int $quantity, int $category_id, int $supplier_id, array $images)
    {

        try {

            $this->conn->beginTransaction();
            $sql = "INSERT INTO products (name, price, quantity, category_id, supplier_id) VALUES (:name, :price, :quantity, :category_id, :supplier_id)";
            $stmt = $this->conn->prepare($sql)->execute([
                "name" => $name,
                "price" => $price,
                "quantity" => $quantity,
                "category_id" => $category_id,
                "supplier_id" => $supplier_id
            ]);
            $newProductId = $this->conn->lastInsertId();

            $sql = "INSERT INTO multiple_images (product_id, image) VALUES (:product_id, :image)";
            $stmt = $this->conn->prepare($sql);

            foreach ($images as $image) {
                $stmt->execute(["product_id" => $newProductId, "image" => $image]);
            }

            $this->conn->commit();
            return true;
        } catch (Exception $e) {
            $this->conn->rollBack();
            throw $e;
        }
    }

    public function products()
    {
        // GROUP_CONCAT take all the imgs that belong to single product and concatenate them together to give something like this : images => "A.png,B.png,C.png"
        $sql = "SELECT 
                products.id, 
                products.name, 
                products.price, 
                products.category_id,
                products.quantity, 
                GROUP_CONCAT(multiple_images.image) 
                AS images FROM products LEFT JOIN multiple_images ON multiple_images.product_id = products.id GROUP BY products.id ORDER BY products.created_at DESC";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($products as &$product) {
            // the & doesn't copy but it takes the original data so that when changed the original data will also get changed
            $product["images"] = $product["images"] ? explode(",", $product["images"]) : [];
            // explode takes the GROUP_CONCA data and separate them with comma making it a real list
            // images => [A.png, B.png, C.png]
        }


        unset($product);
        // // explanation why using unset on product
        // $nums = [1, 2, 3];

        // foreach ($nums as &$n) {
        //     $n = $n * 2;
        // }
        // // $nums is now [2, 4, 6]

        // // A second, innocent-looking loop that reuses the name $n:
        // foreach ($nums as $n) {
        //     // does nothing
        // }
        // print_r($nums);   // [2, 4, 4]  <- the last item changed!
        return $products;
    }

    public function getProduct($id) {
        $sql = "SELECT 
            products.id,
            products.name,
            products.price,
            products.quantity,
            products.category_id,
            products.supplier_id,
            GROUP_CONCAT(multiple_images.image) AS images
            FROM products LEFT JOIN multiple_images
            ON multiple_images.product_id = products.id
            WHERE products.id = :product_id 
        ";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute(["product_id" => $id]);
        $product = $stmt->fetch(PDO::FETCH_ASSOC);
        $product["images"] = $product["images"] ? explode(",", $product["images"]) : [];
        return $product;
    }

    public function delete($id): bool{
        $sql_images = "DELETE FROM multiple_images WHERE product_id=:product_id";
        $stmt_images = $this->conn->prepare($sql_images);
        $stmt_images->execute(["product_id" => $id]);
        $sql = "DELETE FROM products WHERE id=:id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(["id" => $id]);
        return true;
    }

    public function update($id, $name, $price, $quantity, $category_id, $supplier_id): bool {
        $sql = "UPDATE products SET
                name=:name, price=:price, quantity=:quantity, category_id=:category_id, supplier_id=:supplier_id
                WHERE id=:id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(["id" => $id, "name"=>$name, "price"=>$price, "quantity"=>$quantity, "category_id"=>$category_id, "supplier_id"=>$supplier_id]);
        return true;
    }
}

$base_product = new BaseProduct($connection_db);
