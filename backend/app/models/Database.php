<?php

class Database {
    private $host = 'database'; // Replace with your database host
    private $port = '5432'; // Replace with your database port
    private $dbname = 'salesTest'; // Replace with your database name
    private $user = 'admin'; // Replace with your database username
    private $password = 'password'; // Replace with your database password
    private $pdo;

    public function __construct()
    {
        $dsn = "pgsql:host=$this->host;port=$this->port;dbname=$this->dbname;user=$this->user;password=$this->password";
        $this->pdo = new PDO($dsn);
    }

    public function getConnection()
    {
        return $this->pdo;
    }
}

?>