import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import chalk from 'chalk';
import path from 'path';
import { initializeDatabase } from "./bootstrap/app.js";
import webRoutes from "./routes/web.js";

async function startServer() {
    await initializeDatabase();

    const app = express();
    
    app.use(express.json());

    const publicDir = path.join(process.cwd(), 'App', 'public');
    app.use(express.static(publicDir));
    
    app.use('/api', webRoutes);

    app.use((req, res, next) => {
        res.status(404).json({ error: "Rota não encontrada" });
    });

    const webPort = process.env.PORT || 3000;
    const nodePort = process.env.NODE_PORT || webPort;

    app.listen(nodePort, () => {
        console.log(chalk.green(`Servidor rodando em: http://localhost:${webPort}`));
    });
}

startServer();