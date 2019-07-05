DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price INT default 0,
    stock_quantity INT default 0,
    PRIMARY KEY(item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "chair", "houseware", 50, 6),
        (2, "legos", "toys", 10, 18), 
        (3, "tshirts", "clothing", 15, 25),
        (4, "iphone", "technology", 800, 5),
        (5, "blankets", "houseware", 19, 12),
        (6, "shoes", "clothing", 65, 7), 
        (7, "keypad", "technology", 20, 8), 
        (8, "barbie", "toys", 22, 22), 
        (9, "desk", "houseware", 250, 4), 
        (10, "ladder", "tools", 49, 3), 
        (11, "plates", "houseware", 15, 8);

