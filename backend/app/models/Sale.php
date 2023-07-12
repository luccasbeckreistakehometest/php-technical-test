<?php

class Sale {
    private $id;
    private $totalValue;
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function getId()
    {
        return $this->id;
    }

    public function getTotalValue()
    {
        return $this->totalValue;
    }

    public function setTotalValue($totalValue)
    {
        $this->totalValue = $totalValue;
    }

    public function getSales($saleId = null)
    {
        $pdo = $this->db->getConnection();
    
        $query = 'SELECT s.id AS sale_id, s.total_value, si.quantity, si.tax_value, si.subtotal, p.id AS product_id, p.name AS product_name, c.name AS category_name
                   FROM sales AS s
                   JOIN sale_items AS si ON s.id = si.sale_id
                   JOIN products AS p ON si.product_id = p.id
                   JOIN categories AS c ON p.category_id = c.id';
    
        if ($saleId !== null) {
            $query .= ' WHERE s.id = :sale_id';
        }
    
        $stmt = $pdo->prepare($query);
    
        if ($saleId !== null) {
            $stmt->bindValue(':sale_id', $saleId, PDO::PARAM_INT);
        }
    
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }


    public function createSale($saleItems)
    {
        $pdo = $this->db->getConnection();

        try {
            // Start a transaction
            $pdo->beginTransaction();

            // Insert the sale record into the sales table
            $stmt = $pdo->prepare('INSERT INTO sales (total_value) VALUES (:total_value)');
            $stmt->bindValue(':total_value', $this->totalValue, PDO::PARAM_STR);
            $stmt->execute();

            // Get the last inserted sale ID
            $saleId = $pdo->lastInsertId();

            // Insert sale items into the sale_items table
            $stmt = $pdo->prepare('INSERT INTO sale_items (sale_id, product_id, quantity, tax_value, subtotal)
                                   VALUES (:sale_id, :product_id, :quantity, :tax_value, :subtotal)');

            foreach ($saleItems as $saleItem) {
                $productId = $saleItem['product_id'];
                $quantity = $saleItem['quantity'];
                $taxValue = $saleItem['tax_value'];
                $subtotal = $saleItem['subtotal'];

                $stmt->bindValue(':sale_id', $saleId, PDO::PARAM_INT);
                $stmt->bindValue(':product_id', $productId, PDO::PARAM_INT);
                $stmt->bindValue(':quantity', $quantity, PDO::PARAM_INT);
                $stmt->bindValue(':tax_value', $taxValue, PDO::PARAM_STR);
                $stmt->bindValue(':subtotal', $subtotal, PDO::PARAM_STR);

                $stmt->execute();
            }

            // Commit the transaction
            $pdo->commit();

            return $saleId;
        } catch (Exception $e) {
            // Rollback the transaction in case of any errors
            $pdo->rollback();
            throw $e;
        }
    }
}

?>