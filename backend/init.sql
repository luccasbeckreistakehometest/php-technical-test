-- Create a new database
CREATE DATABASE salesTest;

-- Connect to the newly created database
\c salesTest;

-- Create the users table in the new schema
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    tax_value DECIMAL(10,2) NOT NULL
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  value DECIMAL(10, 2) NOT NULL,
  category_id INT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Create sales table
CREATE TABLE sales (
  id SERIAL PRIMARY KEY,
  total_value DECIMAL(10, 2) NOT NULL
);

-- Create sale items table
CREATE TABLE sale_items (
  id SERIAL PRIMARY KEY,
  sale_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  tax_value DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (sale_id) REFERENCES sales (id),
  FOREIGN KEY (product_id) REFERENCES products (id)
);

-- Insert the admin user into the users table
INSERT INTO users (name, password)
VALUES ('admin', 'password');

-- Create a new user with the root username and a password
CREATE USER admin WITH PASSWORD 'password';

-- Grant all privileges on the database to the new user
GRANT ALL PRIVILEGES ON DATABASE salesTest TO admin;

-- Grant all privileges on the schema to the new user
GRANT ALL PRIVILEGES ON SCHEMA salesTest TO admin;

-- Grant all privileges on the users table to the new user
GRANT ALL PRIVILEGES ON TABLE salesTest.users TO admin;