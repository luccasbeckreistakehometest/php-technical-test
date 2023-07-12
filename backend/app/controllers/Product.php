<?php

class ProductController {
    private $productModel;

    public function __construct()
    {
        $this->productModel = new Product();
    }

    public function handleRequest()
    {
        $requestMethod = $_SERVER['REQUEST_METHOD'];

        switch ($requestMethod) {
            case 'GET':
                $id = isset($_GET['id']) ? $_GET['id'] : null;
                $products = $this->productModel->getProducts($id);
                echo json_encode($products);
                break;
            case 'POST':
                $data = json_decode(file_get_contents('php://input'), true);
                $this->productModel->setName($data['name']);
                $this->productModel->setValue($data['value']);
                $this->productModel->setCategoryId($data['category_id']);
                $this->productModel->createProduct();
                echo json_encode(['message' => 'Product created successfully']);
                break;
            case 'PUT':
                $id = $_GET['id'];
                $data = json_decode(file_get_contents('php://input'), true);
                $this->productModel->setName($data['name']);
                $this->productModel->setValue($data['value']);
                $this->productModel->setCategoryId($data['category_id']);
                $this->productModel->updateProduct($id);
                echo json_encode(['message' => 'Product updated successfully']);
                break;
            case 'DELETE':
                $id = $_GET['id'];
                $this->productModel->deleteProduct($id);
                echo json_encode(['message' => 'Product deleted successfully']);
                break;
            default:
                header("HTTP/1.0 405 Method Not Allowed");
                echo json_encode(['error' => 'Method not allowed']);
                break;
        }
    }
}

?>