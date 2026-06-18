import { categoriasModel } from '../models/categorias.model.js';

const categoriaController = {

  listar: async (req, res) => {
    try {
      const categorias = await categoriasModel.selectAll();
      res.status(200).json(categorias);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const categoria = await categoriasModel.selectById(id);

      if (categoria.length === 0) {
        return res.status(404).json({ mensagem: 'Categoria não encontrada' });
      }

      res.status(200).json(categoria);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  criar: async (req, res) => {
    try {
      const { descricao_categoria } = req.body;

      if (!descricao_categoria) {
        return res.status(400).json({ mensagem: 'Descrição obrigatória' });
      }

      const result = await categoriasModel.insert(descricao_categoria);

      res.status(201).json({
        mensagem: 'Categoria criada com sucesso',
        id: result.insertId
      });

    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  atualizar: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { descricao_categoria } = req.body;

      const result = await categoriasModel.update(id, descricao_categoria);

      if (result.affectedRows === 0) {
        return res.status(404).json({ mensagem: 'Categoria não encontrada' });
      }

      res.status(200).json({ mensagem: 'Categoria atualizada' });

    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  deletar: async (req, res) => {
  try {
    const id = Number(req.params.id);

    const result = await categoriasModel.delete(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensagem: 'Categoria não encontrada' });
    }

    res.status(200).json({ mensagem: 'Categoria deletada' });

  } catch (error) {

    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(409).json({
        mensagem: 'Não é possível excluir categoria com produtos vinculados'
      });
    }

    res.status(500).json({ erro: error.message });
  }
}


};

export default categoriaController;
