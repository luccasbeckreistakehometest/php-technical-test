<?php
class SaleController {
    private $saleModel;

    public function __construct()
    {
        $this->saleModel = new Sale();
    }

    public function handleRequest()
    {
        $requestMethod = $_SERVER['REQUEST_METHOD'];

        switch ($requestMethod) {
            case 'POST':
                $data = json_decode(file_get_contents('php://input'), true);
                $totalValue = $data['total_value'];
                $saleItems = $data['items'];

                $this->saleModel->setTotalValue($totalValue);
                $saleId = $this->saleModel->createSale($saleItems);

                echo json_encode(['message' => 'Sale created successfully', 'sale_id' => $saleId]);
                break;
            case 'GET':
                $saleId = isset($_GET['id']) ? $_GET['id'] : null;
                $sales = $this->saleModel->getSales($saleId);
                echo json_encode($sales);
                break;
            default:
                header("HTTP/1.0 405 Method Not Allowed");
                echo json_encode(['error' => 'Method not allowed']);
                break;
        }
    }
}
?>