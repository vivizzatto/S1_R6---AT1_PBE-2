import fs from 'fs';
import path from 'path';
import { produtosModel } from '../models/produtos.model.js';

const produtoController = {

  listar: async (req, res) => {
    try {
      const produtos = await produtosModel.selectAllProdutos();
      res.status(200).json(produtos);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const produto = await produtosModel.selectByProduto(id);

      if (produto.length === 0) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
      }

      res.status(200).json(produto);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  criar: async (req, res) => {
    try {
      const { id_categoria, nome_produto, valor_produto } = req.body;
      const imagem = req.file ? req.file.filename : null;

      const result = await produtosModel.insertProduto(
        id_categoria,
        nome_produto,
        valor_produto,
        imagem
      );

      res.status(201).json({
        mensagem: 'Produto criado com sucesso',
        id: result.insertId
      });

    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  atualizar: async (req, res) => {
    try {
      const id = Number(req.params.id);

      const produto = await produtosModel.selectByProduto(id);

      if (produto.length === 0) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
      }

      const produtoAtual = produto[0];

      // pra manter valor antigo se não vier no multipart
      const id_categoria = req.body.id_categoria || produtoAtual.id_categoria;
      const nome_produto = req.body.nome_produto || produtoAtual.nome_produto;
      const valor_produto = req.body.valor_produto || produtoAtual.valor_produto;

      let imagemFinal = produtoAtual.vinculo_imagem;

      if (req.file) {
        imagemFinal = req.file.filename;

        if (produtoAtual.vinculo_imagem) {
          const caminhoAntigo = path.resolve('uploads/images', produtoAtual.vinculo_imagem);

          if (fs.existsSync(caminhoAntigo)) {
            fs.unlinkSync(caminhoAntigo);
          }
        }
      }

      await produtosModel.updateProduto(
        id,
        id_categoria,
        nome_produto,
        valor_produto,
        imagemFinal
      );

      res.status(200).json({ mensagem: 'Produto atualizado com sucesso' });

    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  deletar: async (req, res) => {
    try {
      const id = Number(req.params.id);

      const produto = await produtosModel.selectByProduto(id);

      if (produto.length === 0) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
      }

      const imagem = produto[0].vinculo_imagem;

      // apagar imagem da pasta
      if (imagem) {
        const caminhoImagem = path.resolve('uploads/images', imagem);

        if (fs.existsSync(caminhoImagem)) {
          fs.unlinkSync(caminhoImagem);
        }
      }

      await produtosModel.deleteProduto(id);

      res.status(200).json({ mensagem: 'Produto deletado com sucesso' });

    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

};

export default produtoController;
