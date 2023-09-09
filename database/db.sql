-- Active: 1693362478544@@127.0.0.1@3306
-- Creando la base de datos

CREATE DATABASE crudnodejsmysql;

-- usar la base de datos 
USE crudnodejsmysql;

-- creando una tabla
CREATE TABLE customer(
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    address VARCHAR (100) NOT NULL,
    phone VARCHAR(15)
);

--Para mostrar todas las tablas
SHOW TABLES; 
--Para describir la tabla
DESCRIBE CUSTOMER;
--Para seleccionar datos 
SELECT * FROM customer;