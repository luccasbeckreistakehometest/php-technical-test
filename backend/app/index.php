<?php

require_once 'models/Database.php';
require_once 'models/User.php';
require_once 'controllers/User.php';
require_once 'models/Category.php';
require_once 'controllers/Category.php';
require_once 'models/Product.php';
require_once 'controllers/Product.php';
require_once 'models/Sale.php';
require_once 'controllers/Sale.php';

// Set CORS headers
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Handle incoming API requests
$requestUri = $_SERVER['REQUEST_URI'];

// Remove any leading slash from the request URI
$requestUri = ltrim($requestUri, '/');

// Extract the route from the request URI
$route = strtok($requestUri, '?');

// Instantiate UserController and CategoryController and ProductController objects
$userController = new UserController();
$categoryController = new CategoryController();
$productController = new ProductController();
$saleController = new SaleController();

// Process the route
switch ($route) {
    case 'app/api/users':
        $userController->handleRequest();
        break;
    case 'app/api/users/login':
        $userController->login();
        break;
    case 'app/api/categories':
        $categoryController->handleRequest();
        break;
    case 'app/api/products':
        $productController->handleRequest();
        break;
    case 'app/api/sales':
        $saleController->handleRequest();
        break;
    default:
        header("HTTP/1.0 404 Not Found");
        echo json_encode(['error' => 'Route not found']);
        break;
}

?>