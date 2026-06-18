import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Singleton para a conexão com o banco de dados
class Database {
  static #instance = null;
  #pool = null;


  #createPool() {
    this.#pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
      waitForConnections: true,
      connectionLimit: 100,
      queueLimit: 0,
      ssl: {
        rejectUnauthorized: false
      }
    });
  }


  static getInstance() {
    if (!Database.#instance) {
      Database.#instance = new Database();
      Database.#instance.#createPool();
    }
    return Database.#instance;
  }


  getPool() {
    return this.#pool;
  }
}


export const connection = Database.getInstance().getPool();


export async function initializeDatabase() {
  console.log("Inicializando o banco de dados e tabelas...");
  try {
    const tempConnection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      ssl: { rejectUnauthorized: false }
    });


    const dbName = process.env.DB_DATABASE || 'deploy';


    await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    await tempConnection.query(`USE \`${dbName}\`;`);


    await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS categorias(
	              id_categoria INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                descricao_categoria VARCHAR(100) NOT NULL,
                data_cad_cat DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
            );
        `);


    await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS produtos(
	              id_produto INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                id_categoria INT,
                nome_produto VARCHAR(50) NOT NULL,
                valor_produto DECIMAL(10, 2) NOT NULL,
                vinculo_imagem VARCHAR(50) NOT NULL,
                data_cad_prod DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
                FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
            );
        `);


    await tempConnection.end();
    console.log("Banco de dados e tabelas verificados/criados com sucesso.");
  } catch (error) {
    console.error("Erro ao criar o banco ou as tabelas:", error);
    throw error;
  }
}

