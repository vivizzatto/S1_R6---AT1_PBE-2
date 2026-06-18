import { Router } from "express";
import categoriaController from "../controllers/categorias.controller.js";

const router = Router();

router.get('/categorias', categoriaController.listar);
router.get('/categorias/:id', categoriaController.buscarPorId);
router.post('/categorias', categoriaController.criar);
router.put('/categorias/:id', categoriaController.atualizar);
router.delete('/categorias/:id', categoriaController.deletar);

export default router;
