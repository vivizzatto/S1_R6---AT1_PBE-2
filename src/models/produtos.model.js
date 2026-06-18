import { pool } from '../config/db.js';

const produtosModel = {

  selectAllProdutos: async () => {
    const sql = `
      SELECT p.*, c.descricao_categoria
      FROM produtos p
      INNER JOIN categorias c ON p.id_categoria = c.id_categoria
    `;
    const [rows] = await pool.query(sql);
    return rows;
  },

  selectByProduto: async (id) => {
    const sql = 'SELECT * FROM produtos WHERE id_produto = ?';
    const [rows] = await pool.query(sql, [id]);
    return rows;
  },

  insertProduto: async (idCategoria, nome, valor, imagem) => {
    const sql = `
      INSERT INTO produtos 
      (id_categoria, nome_produto, valor_produto, vinculo_imagem)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.query(sql, [idCategoria, nome, valor, imagem]);
    return result;
  },

  updateProduto: async (id, idCategoria, nome, valor, imagem) => {
    const sql = `
      UPDATE produtos 
      SET id_categoria=?, nome_produto=?, valor_produto=?, vinculo_imagem=?
      WHERE id_produto=?
    `;
    const [result] = await pool.query(sql, [idCategoria, nome, valor, imagem, id]);
    return result;
  },

  deleteProduto: async (id) => {
    const sql = 'DELETE FROM produtos WHERE id_produto=?';
    const [result] = await pool.query(sql, [id]);
    return result;
  }

};

export { produtosModel };
