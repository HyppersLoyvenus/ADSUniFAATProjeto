import { Router } from 'express';
import AlunoController from '../Controllers/AlunoController.js';
import ResponsavelController from '../Controllers/ResponsavelController.js';
import TurmaController from '../Controllers/TurmaController.js';
import UsuarioController from '../Controllers/UsuarioController.js';
import ProfessorController from '../Controllers/ProfessorController.js';
import PagamentoController from '../Controllers/PagamentoController.js';
import AtividadeController from '../Controllers/AtividadeController.js';
import PresencaController from '../Controllers/PresencaController.js';

const router = Router();

router.get('/', (req, res) => {
    res.json({ status: 'API está no ar!' });
});

// ROTAS DE USUARIOS
router.post('/usuarios', UsuarioController.create);
router.get('/usuarios', UsuarioController.getAll);
router.get('/usuarios/:id', UsuarioController.getById);
router.put('/usuarios/:id', UsuarioController.update);
router.delete('/usuarios/:id', UsuarioController.delete);

// ROTAS DE RESPONSAVEIS
router.post('/responsaveis', ResponsavelController.create);
router.get('/responsaveis', ResponsavelController.getAll);
router.get('/responsaveis/:id', ResponsavelController.getById);
router.put('/responsaveis/:id', ResponsavelController.update);
router.delete('/responsaveis/:id', ResponsavelController.delete);

// ROTAS DE PROFESSORES
router.post('/professores', ProfessorController.create);
router.get('/professores', ProfessorController.getAll);
router.get('/professores/:id', ProfessorController.getById);
router.put('/professores/:id', ProfessorController.update);
router.delete('/professores/:id', ProfessorController.delete);

// ROTAS DE TURMAS
router.post('/turmas', TurmaController.create);
router.get('/turmas', TurmaController.getAll);
router.get('/turmas/:id', TurmaController.getById);
router.put('/turmas/:id', TurmaController.update);
router.delete('/turmas/:id', TurmaController.delete);

// ROTAS DE ALUNOS
router.post('/alunos', AlunoController.create);
router.get('/alunos', AlunoController.getAll);
router.get('/alunos/:id', AlunoController.getById);
router.put('/alunos/:id', AlunoController.update);
router.delete('/alunos/:id', AlunoController.delete);

// ROTAS DE PAGAMENTOS
router.post('/pagamentos', PagamentoController.create);
router.get('/pagamentos', PagamentoController.getAll);
router.get('/pagamentos/:id', PagamentoController.getById);
router.put('/pagamentos/:id', PagamentoController.update);
router.delete('/pagamentos/:id', PagamentoController.delete);

// ROTAS DE ATIVIDADES
router.post('/atividades', AtividadeController.create);
router.get('/atividades', AtividadeController.getAll);
router.get('/atividades/:id', AtividadeController.getById);
router.put('/atividades/:id', AtividadeController.update);
router.delete('/atividades/:id', AtividadeController.delete);

// ROTAS DE PRESENÇAS
router.post('/presencas', PresencaController.create);
router.get('/presencas', PresencaController.getAll);
router.get('/presencas/:id', PresencaController.getById);
router.put('/presencas/:id', PresencaController.update);
router.delete('/presencas/:id', PresencaController.delete);

export default router;