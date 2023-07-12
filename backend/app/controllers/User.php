<?php

class UserController {
    private $userModel;

    public function __construct()
    {
        $this->userModel = new User();
    }

    public function handleRequest()
    {
        $requestMethod = $_SERVER['REQUEST_METHOD'];

        switch ($requestMethod) {
            case 'GET':
                $id = isset($_GET['id']) ? $_GET['id'] : null;
                $users = $this->userModel->getUsers($id);
                echo json_encode($users);
                break;
            case 'POST':
                $data = json_decode(file_get_contents('php://input'), true);
                $this->userModel->setName($data['name']);
                $this->userModel->setPassword($data['password']);
                $this->userModel->createUser();
                echo json_encode(['message' => 'User created successfully']);
                break;
            case 'PUT':
                $id = $_GET['id'];
                $data = json_decode(file_get_contents('php://input'), true);
                $this->userModel->setName($data['name']);
                $this->userModel->setPassword($data['password']);
                $this->userModel->updateUser($id);
                echo json_encode(['message' => 'User updated successfully']);
                break;
            case 'DELETE':
                $id = $_GET['id'];
                $this->userModel->deleteUser($id);
                echo json_encode(['message' => 'User deleted successfully']);
                break;
            default:
                header("HTTP/1.0 405 Method Not Allowed");
                echo json_encode(['error' => 'Method not allowed']);
                break;
        }
    }

    public function login()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $this->userModel->setName($data['name']);
        $this->userModel->setPassword($data['password']);
        $result = $this->userModel->login();

        if ($result) {
            echo json_encode($result);
        } else {
            header("HTTP/1.0 401 Unauthorized");
            echo json_encode(['error' => 'Invalid username or password']);
        }
    }
} 
?>