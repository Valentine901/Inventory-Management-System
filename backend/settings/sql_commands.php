<?php 

abstract class BaseRepository{
    protected string $table;
    protected array $column; //columns allowed in queries
    protected array $hidden; // columns never returned by queries


    public function __construct(protected PDO $conn) {}


    // ----------- helpers --------------
    private function assertColumn(string $column): void {
        if (!in_array($column, $this->column, true)) {
            throw new InvalidArgumentException("Unknown column: ", $column);
        }
    }

    private function bindAll(PDOStatement $stmt, array $params): void {
        foreach ($params as $name => $value) {
            if (is_bool($value)) $value = (int)$value;
            $stmt->bindValue($name, $value, is_int($value) ? PDO::PARAM_INT : PDO::PARAM_STR);
        }
    }

    private function buildWhere(array $conditions): array {
        $parts = [];
        $params = [];

        foreach ($conditions as $column => $value) {
            if ($value === null) continue;
            $this->assertColumn($column);
            $parts[] = "$column = :w_$column";
            $params[":w_$column"] = $value;
        }

        return [$parts ? "WHERE " . implode(" AND ", $parts) : "", $params];
    }

    // -------------- public methods ----------------
  
    public function insert(array $data): int
    {
        $data = array_filter($data, fn($v) => $v !== null);
        if (!$data) throw new InvalidArgumentException("Nothing to insert");

        $params = [];
        foreach ($data as $column => $value) {
            $this->assertColumn($column);
            $params[":$column"] = $value;
        }
        $sql = "INSERT INTO {$this->table} (" . implode(", ", array_keys($data)) . ")
                VALUES (" . implode(", ", array_keys($params)) . ")";

        $stmt = $this->conn->prepare($sql);
        $this->bindAll($stmt, $params);
        $stmt->execute();
        return (int)$this->conn->lastInsertId();
    }

    public function findAll(array $where = [], ?string $orderBy = null, string $direction = "ASC",
                            ?int $limit = null, int $offset = 0): array
    {
        $select = implode(", ", array_diff($this->columns, $this->hidden));
        [$whereSql, $params] = $this->buildWhere($where);
        $sql = "SELECT $select FROM {$this->table}$whereSql";

        if ($orderBy !== null) {
            $this->assertColumn($orderBy);
            $sql .= " ORDER BY $orderBy " . (strtoupper($direction) === "DESC" ? "DESC" : "ASC");
        }
        if ($limit !== null) {
            $sql .= " LIMIT :limit OFFSET :offset";
            $params[":limit"] = $limit;
            $params[":offset"] = $offset;
        }

        $stmt = $this->conn->prepare($sql);
        $this->bindAll($stmt, $params);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function findOne(array $where): ?array
    {
        [$check] = $this->buildWhere($where);
        if ($check === "") throw new InvalidArgumentException("findOne needs a condition");
        return $this->findAll($where, null, "ASC", 1)[0] ?? null;
    }

    public function count(array $where = []): int
    {
        [$whereSql, $params] = $this->buildWhere($where);
        $stmt = $this->conn->prepare("SELECT COUNT(*) FROM {$this->table}$whereSql");
        $this->bindAll($stmt, $params);
        $stmt->execute();
        return (int)$stmt->fetchColumn();
    }

    public function update(array $data, array $where): int
    {
        $data = array_filter($data, fn($v) => $v !== null);   // partial updates
        if (!$data) throw new InvalidArgumentException("Nothing to update");

        $sets = [];
        $params = [];
        foreach ($data as $column => $value) {
            $this->assertColumn($column);
            $sets[] = "$column = :s_$column";
            $params[":s_$column"] = $value;
        }

        [$whereSql, $whereParams] = $this->buildWhere($where);
        if ($whereSql === "") throw new InvalidArgumentException("Refusing to update without a condition");

        $stmt = $this->conn->prepare("UPDATE {$this->table} SET " . implode(", ", $sets) . $whereSql);
        $this->bindAll($stmt, $params + $whereParams);
        $stmt->execute();
        return $stmt->rowCount();
    }

    public function delete(array $where): int
    {
        [$whereSql, $params] = $this->buildWhere($where);
        if ($whereSql === "") throw new InvalidArgumentException("Refusing to delete without a condition");

        $stmt = $this->conn->prepare("DELETE FROM {$this->table}$whereSql");
        $this->bindAll($stmt, $params);
        $stmt->execute();
        return $stmt->rowCount();
    }

}


?>