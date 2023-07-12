<?php

class CategoryController {
    private $categoryModel;

    public function __construct()
    {
        $this->categoryModel = new Category();
    }

    public function handleRequest()
    {
        $requestMethod = $_SERVER['REQUEST_METHOD'];

        switch ($requestMethod) {
            case 'GET':
                $id = isset($_GET['id']) ? $_GET['id'] : null;
                $categories = $this->categoryModel->getCategories($id);
                echo json_encode($categories);
                break;
            case 'POST':
                $data = json_decode(file_get_contents('php://input'), true);
                $this->categoryModel->setName($data['name']);
                $this->categoryModel->setTaxValue($data['tax_value']);
                $this->categoryModel->createCategory();
                echo json_encode(['message' => 'Category created successfully']);
                break;
            case 'PUT':
                $id = $_GET['id'];
                $data = json_decode(file_get_contents('php://input'), true);
                $this->categoryModel->setName($data['name']);
                $this->categoryModel->setTaxValue($data['tax_value']);
                $this->categoryModel->updateCategory($id);
                echo json_encode(['message' => 'Category updated successfully']);
                break;
            case 'DELETE':
                $id = $_GET['id'];
                $this->categoryModel->deleteCategory($id);
                echo json_encode(['message' => 'Category deleted successfully']);
                break;
            default:
                header("HTTP/1.0 405 Method Not Allowed");
                echo json_encode(['error' => 'Method not allowed']);
                break;
        }
    }
}

?>