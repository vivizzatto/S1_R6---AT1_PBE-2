import { Router } from "express";
import produtoController from "../controllers/produtos.controller.js";
import uploadImage from "../middlewares/uploadImage.middleware.js";

const router = Router();

router.get('/produtos', produtoController.listar);
router.get('/produtos/:id', produtoController.buscarPorId);
router.post('/produtos', uploadImage, produtoController.criar);
router.put('/produtos/:id', uploadImage, produtoController.atualizar);
router.delete('/produtos/:id', produtoController.deletar);

export default router;
