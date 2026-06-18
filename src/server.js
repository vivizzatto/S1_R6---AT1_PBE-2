import express from 'express';
import produtosRoutes from './routes/produto.routes.js';
import categoriasRoutes from './routes/categoria.routes.js';
import path from 'path';
import 'dotenv/config';
import { initializeDatabase } from './config/db.js';

const app = express();
app.use(express.json());

app.use('/', produtosRoutes);
app.use('/', categoriasRoutes);
app.use('/images', express.static(path.resolve('uploads/images')));

initializeDatabase().then(() => {
    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Servidor rodando na porta ${process.env.SERVER_PORT}`);
    });
}).catch(err => {
    console.error("Erro ao inicializar o banco de dados:", err);
});



