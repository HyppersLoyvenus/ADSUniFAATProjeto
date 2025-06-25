import { Router } from 'express';
import AlunoController from '../Controllers/AlunoController.js';
import ResponsavelController from '../Controllers/ResponsavelController.js';
import TurmaController from '../Controllers/TurmaController.js';

const router = Router();

router.get('/', (req, res) => {
    res.json({ status: 'API está no ar!' });
});

// ROTAS DE ALUNOS
router.post('/alunos', AlunoController.create);
router.get('/alunos', AlunoController.getAll);
router.get('/alunos/:id', AlunoController.getById);
router.put('/alunos/:id', AlunoController.update);
router.delete('/alunos/:id', AlunoController.delete);

// ROTAS DE RESPONSAVEIS
router.post('/responsaveis', ResponsavelController.create);
router.get('/responsaveis', ResponsavelController.getAll);
router.get('/responsaveis/:id', ResponsavelController.getById);
router.put('/responsaveis/:id', ResponsavelController.update);
router.delete('/responsaveis/:id', ResponsavelController.delete);

// ROTAS DE TURMAS
router.post('/turmas', TurmaController.create);
router.get('/turmas', TurmaController.getAll);
router.get('/turmas/:id', TurmaController.getById);
router.put('/turmas/:id', TurmaController.update);
router.delete('/turmas/:id', TurmaController.delete);

export default router;