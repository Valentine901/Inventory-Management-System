<?php 
require_once __DIR__ . "/../../settings/database.php";

class BaseStaff{
    private $conn;

    public function __construct($conn){
        $this -> conn = $conn;
    }

    public function create(string $username, string $email, string $member_id, string $password): bool{
        $sql = "INSERT INTO users (username, email, member_id, password, role, is_active) VALUES (:username, :email, :member_id, :password, :role, :is_active)";
        $statement = $this->conn->prepare($sql);
        $statement -> execute([
            "username" => $username,
            "email" => $email,
            "member_id" => $member_id,
            "password" => $password,
            "is_active" => false,
            "role" => "staff"
        ]);
        return true;
    }
    
    // all staffs
    public function get_staffs(int $limit, int $offset, ?bool $is_active = null): array{
        // ? entails that is_active variable can be bool or null

        // $where is the placeholder that holds the condition for role
        $where = "role = :role";

        // check if is_active is bool and concatenate it with another sentence using .=
        if ($is_active !== null){
            $where .= " AND is_active = :is_active";
        }
        // finally it will be like this : "role = :role AND is_active = :is_active"

        // inserted the $where placeholder inside the sql command below to complete the query
        $sql = "SELECT created_at, username, email, member_id, is_active, role FROM users WHERE $where ORDER BY created_at DESC LIMIT :limit OFFSET :offset";
        $statement = $this->conn->prepare($sql);

        // bind them as integers so PDO handles limit/offset
        // bindValue inserts the value of role and is_active inside the above placeholder "$where" to suit the dynamic query
        $statement->bindValue(":role", "staff", PDO::PARAM_STR);
        // is_active can only be inserted inside the placeholder if and only if it exists
        if ($is_active !== null) {
            // if is_active == bool then convert them to int
            // false = 0 and true = 1
            $statement->bindValue(":is_active", (int)$is_active, PDO::PARAM_INT);
        }
        $statement->bindValue(":limit", (int)$limit, PDO::PARAM_INT);
        $statement->bindValue(":offset", (int)$offset, PDO::PARAM_INT);

        $statement->execute();
        // fetch all rows
        $rows = $statement -> fetchAll(PDO::FETCH_ASSOC);

        // count the grand total of all the staff members
        $count_query = "SELECT COUNT(*) FROM users WHERE $where";
        $count = $this->conn->prepare($count_query);
        $count->bindValue(":role", "staff", PDO::PARAM_STR);
        if($is_active !== null){
            $count->bindValue(":is_active", (int)$is_active, PDO::PARAM_INT);
        }
        $count->execute();

        // fetch total staffs
        $total_staffs = (int)$count->fetchColumn();

        return ["data" => $rows, "totalStaffs" => $total_staffs];
    }


    public function get_staff(string $member_id){
        $sql = "SELECT * FROM users WHERE role = :role AND member_id = :member_id";
        $statement = $this->conn->prepare($sql);
        // member_id = STAFF_ID_2372 and is UNIQUE
        $statement->execute(["role" => "staff", "member_id" => $member_id]);
        $result = $statement -> fetch(PDO::FETCH_ASSOC);
        return $result ? $result : false;
    }

    public function get_staff_by_id(int $id){
        $sql = "SELECT * FROM users WHERE role = :role AND id = :id";
        $statement = $this->conn->prepare($sql);
        // member_id = STAFF_ID_2372 and is UNIQUE
        $statement->execute(["role" => "staff", "id" => $id]);
        $result = $statement -> fetch(PDO::FETCH_ASSOC);
        return $result ? $result : false;
    }


    // stopped here , continue from staff update logic later
    public function update_staff($member_id, $username, $email, $role): bool {
        $sql = "UPDATE users SET username=:username, email=:email, role=:role WHERE member_id = :member_id AND role=:role";
        $statement = $this->conn->prepare($sql);
        $statement->execute(["member_id" => $member_id, "username"=>$username, "email" => $email, "role" => $role]);
        return true;
    }

    public function delete_staff($member_id):bool {
        $sql = "DELETE FROM users WHERE member_id = :member_id";
        $statement = $this->conn->prepare($sql);
        $statement->execute(["member_id" => $member_id]);
        return true;
    }


    public function update_staff_status(string $member_id): bool{
        $sql = "UPDATE users SET is_active = true WHERE member_id = :member_id and role = :role";
        $statement = $this->conn->prepare($sql);
        $statement -> execute(["role" => "staff", "member_id" => $member_id]);
        return true;
    }
}

$base_staff = new BaseStaff($connection_db);

?>