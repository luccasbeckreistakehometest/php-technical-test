<?php

class Product {
    private $id;
    private $name;
    private $value;
    private $categoryId;
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

    public function getValue()
    {
        return $this->value;
    }

    public function setValue($value)
    {
        $this->value = $value;
    }

    public function getCategoryId()
    {
        return $this->categoryId;
    }

    public function setCategoryId($categoryId)
    {
        $this->categoryId = $categoryId;
    }

    public function getProducts($id = null)
    {
        $pdo = $this->db->getConnection();

        if ($id !== null) {
            $stmt = $pdo->prepare('SELECT p.id, p.name, p.value, p.category_id, c.name AS category_name, c.tax_value AS category_tax
                                FROM products AS p
                                JOIN categories AS c ON p.category_id = c.id
                                WHERE p.id = :id');
            $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        } else {
            $stmt = $pdo->prepare('SELECT p.id, p.name, p.value, p.category_id, c.name AS category_name, c.tax_value AS category_tax
                                FROM products AS p
                                JOIN categories AS c ON p.category_id = c.id');
        }

        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function createProduct()
    {
        $pdo = $this->db->getConnection();

        $stmt = $pdo->prepare('INSERT INTO products (name, value, category_id) VALUES (:name, :value, :category_id)');
        $stmt->bindValue(':name', $this->name, PDO::PARAM_STR);
        $stmt->bindValue(':value', $this->value, PDO::PARAM_STR);
        $stmt->bindValue(':category_id', $this->categoryId, PDO::PARAM_INT);

        $stmt->execute();
    }

    public function updateProduct($id)
    {
        $pdo = $this->db->getConnection();

        $stmt = $pdo->prepare('UPDATE products SET name = :name, value = :value, category_id = :category_id WHERE id = :id');
        $stmt->bindValue(':name', $this->name, PDO::PARAM_STR);
        $stmt->bindValue(':value', $this->value, PDO::PARAM_STR);
        $stmt->bindValue(':category_id', $this->categoryId, PDO::PARAM_INT);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);

        $stmt->execute();
    }

    public function deleteProduct($id)
    {
        $pdo = $this->db->getConnection();

        $stmt = $pdo->prepare('DELETE FROM products WHERE id = :id');
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);

        $stmt->execute();
    }
} 

?>