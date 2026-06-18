-- nome do banco: loja_img
CREATE DATABASE loja_img;
USE loja_img;

CREATE TABLE categorias(
	id_categoria INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    descricao_categoria VARCHAR(100) NOT NULL,
    data_cad_cat DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE produtos(
	id_produto INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_categoria INT,
    nome_produto VARCHAR(50) NOT NULL,
    valor_produto DECIMAL(10, 2) NOT NULL,
    vinculo_imagem VARCHAR(50) NOT NULL,
    data_cad_prod DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

SELECT * FROM produtos;