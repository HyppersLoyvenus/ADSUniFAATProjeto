import { Router } from 'express';
import AlunoController from '../Controllers/AlunoController.js';

const router = Router();

router.get('/', (req, res) => {
    res.json({ status: 'API está no ar!' });
});

// ROTAS DE ALUNOS
router.post('/alunos', AlunoController.create);        // Endpoint para CRIAR um aluno
router.get('/alunos', AlunoController.getAll);         // Endpoint para LISTAR todos os alunos
router.get('/alunos/:id', AlunoController.getById);     // Endpoint para BUSCAR UM aluno pelo ID
router.put('/alunos/:id', AlunoController.update);      // Endpoint para ATUALIZAR um aluno pelo ID
router.delete('/alunos/:id', AlunoController.delete);   // Endpoint para "DELETAR" um aluno pelo ID

export default router;