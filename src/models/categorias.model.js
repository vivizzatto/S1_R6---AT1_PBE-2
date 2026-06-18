import { pool } from '../config/db.js';

const categoriasModel = {

  selectAll: async () => {
    const sql = 'SELECT * FROM categorias';
    const [rows] = await pool.query(sql);
    return rows;
  },

  selectById: async (id) => {
    const sql = 'SELECT * FROM categorias WHERE id_categoria = ?';
    const [rows] = await pool.query(sql, [id]);
    return rows;
  },

  insert: async (descricao) => {
    const sql = `
      INSERT INTO categorias (descricao_categoria)
      VALUES (?)
    `;
    const [result] = await pool.query(sql, [descricao]);
    return result;
  },

  update: async (id, descricao) => {
    const sql = `
      UPDATE categorias
      SET descricao_categoria = ?
      WHERE id_categoria = ?
    `;
    const [result] = await pool.query(sql, [descricao, id]);
    return result;
  },

  delete: async (id) => {
    const sql = 'DELETE FROM categorias WHERE id_categoria = ?';
    const [result] = await pool.query(sql, [id]);
    return result;
  }

};

export { categoriasModel };
