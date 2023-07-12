<?php
class Category {
    private $id;
    private $name;
    private $taxValue;
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

    public function getTaxValue()
    {
        return $this->taxValue;
    }

    public function setTaxValue($taxValue)
    {
        $this->taxValue = $taxValue;
    }

    public function getCategories($id = null)
    {
        $pdo = $this->db->getConnection();

        if ($id !== null) {
            $stmt = $pdo->prepare('SELECT id, name, tax_value FROM categories WHERE id = :id');
            $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        } else {
            $stmt = $pdo->prepare('SELECT id, name, tax_value FROM categories');
        }

        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function createCategory()
    {
        $pdo = $this->db->getConnection();

        $stmt = $pdo->prepare('INSERT INTO categories (name, tax_value) VALUES (:name, :tax_value)');
        $stmt->bindValue(':name', $this->name, PDO::PARAM_STR);
        $stmt->bindValue(':tax_value', $this->taxValue, PDO::PARAM_STR);

        $stmt->execute();
    }

    public function updateCategory($id)
    {
        $pdo = $this->db->getConnection();

        $stmt = $pdo->prepare('UPDATE categories SET name = :name, tax_value = :tax_value WHERE id = :id');
        $stmt->bindValue(':name', $this->name, PDO::PARAM_STR);
        $stmt->bindValue(':tax_value', $this->taxValue, PDO::PARAM_STR);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);

        $stmt->execute();
    }

    public function deleteCategory($id)
    {
        $pdo = $this->db->getConnection();

        $stmt = $pdo->prepare('DELETE FROM categories WHERE id = :id');
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);

        $stmt->execute();
    }
}

?>