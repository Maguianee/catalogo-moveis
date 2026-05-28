CREATE DATABASE catalogoMoveis;
USE catalogoMoveis;

CREATE TABLE catalogoMoveis(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_item VARCHAR(255) NOT NULL,
    descricao VARCHAR(255),
    preco NUMERIC(6,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
