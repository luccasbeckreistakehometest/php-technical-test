<?php
class User {
    private $id;
    private $name;
    private $password;
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function getId()
    {
        return $this->id;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function setPassword($password)
    {
        $this->password = $password;
    }

    public function getUsers($id = null)
    {
        $pdo = $this->db->getConnection();

        if ($id !== null) {
            $stmt = $pdo->prepare('SELECT id, name FROM users WHERE id = :id');
            $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        } else {
            $stmt = $pdo->prepare('SELECT id, name FROM users');
        }

        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function createUser()
    {
        $pdo = $this->db->getConnection();

        $stmt = $pdo->prepare('INSERT INTO users (name, password) VALUES (:name, :password)');
        $stmt->bindValue(':name', $this->name, PDO::PARAM_STR);
        $stmt->bindValue(':password', $this->password, PDO::PARAM_STR);

        $stmt->execute();
    }

    public function updateUser($id)
    {
        $pdo = $this->db->getConnection();

        $stmt = $pdo->prepare('UPDATE users SET name = :name, password = :password WHERE id = :id');
        $stmt->bindValue(':name', $this->name, PDO::PARAM_STR);
        $stmt->bindValue(':password', $this->password, PDO::PARAM_STR);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);

        $stmt->execute();
    }

    public function deleteUser($id)
    {
        $pdo = $this->db->getConnection();

        $stmt = $pdo->prepare('DELETE FROM users WHERE id = :id');
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);

        $stmt->execute();
    }

    public function login()
    {
        $pdo = $this->db->getConnection();

        $stmt = $pdo->prepare('SELECT id, name FROM users WHERE name = :name AND password = :password');
        $stmt->bindValue(':name', $this->name, PDO::PARAM_STR);
        $stmt->bindValue(':password', $this->password, PDO::PARAM_STR);

        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result;
    }
}

?>