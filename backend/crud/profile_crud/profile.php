<?php
require_once __DIR__ . "/../../settings/database.php";


class BaseProfile
{
    private PDO $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function create(string $first_name, string $last_name, string $image, int $user_id): bool
    {
        try {
            $this->conn->beginTransaction();
            $sql = "INSERT INTO profiles (first_name, last_name, image, user_id) VALUES (:first_name, :last_name, :image, :user_id)";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute([
                "first_name" => $first_name,
                "last_name" => $last_name,
                "image" => $image,
                "user_id" => $user_id
            ]);

            return true;
        } catch (PDOException $e) {
            $this->conn->rollBack();
            return false;
        }
    }

    public function update(int $id, string $first_name, string $last_name, string $image): bool
    {
        try {
            $this->conn->beginTransaction();
            $sql = "UPDATE profiles SET first_name =:first_name, last_name=:last_name, image=:image WHERE id =:id";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute([
                "first_name" => $first_name,
                "last_name" => $last_name,
                "image" => $image,
                "id" => $id
            ]);

            return true;
        } catch (PDOException $e) {
            $this->conn->rollBack();
            return false;
        }
    }

    public function user_profile(int $user_id)
    {
        $sql = "SELECT id, first_name, last_name WHERE user_id=:user_id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([
            "user_id" => $user_id
        ]);

        $profile = $stmt->fetch(PDO::FETCH_ASSOC);
        return $profile ?? null;
    }
}

$base_profile = new BaseProfile($connection_db);
?>
