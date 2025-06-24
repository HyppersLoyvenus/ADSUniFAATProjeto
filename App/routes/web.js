import express from 'express';
import { Usuario, Professor, Aluno, Responsavel, Turma } from '../Models/index.js';
import sequelize from '../config/sequelize.js';
// importar controllers dps
// import ProfessorController from '../controllers/ProfessorController.js';

const router = express.Router();

router.post('/teste-criar-professor', async (req, res) => {
    // Ex: { "email": "prof.novo@escola.com", "cpf": "55566677788", "nome": "Novo Prof" }
    const { email, cpf, nome } = req.body;

    if (!email || !cpf || !nome) {
        return res.status(400).json({ mensagem: 'Email, CPF e Nome são obrigatórios.' });
    }

    const t = await sequelize.transaction();

    try {
        const novoUsuario = await Usuario.create({
            email: email,
            senha: 'senha_hash_padrao',
            status: 'Ativo'
        }, { transaction: t });

        const novoProfessor = await Professor.create({
            nome: nome,
            cpf: cpf,
            telefone: '00000000000',
            email: email,
            data_contratacao: new Date(),
            id_usuario: novoUsuario.id
        }, { transaction: t });

        await t.commit();
        res.status(201).json({ usuario: novoUsuario, professor: novoProfessor });

    } catch (error) {
        await t.rollback();
        console.error('Erro ao criar professor:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ mensagem: 'Email ou CPF já cadastrado.', detalhes: error.errors });
        }
        res.status(500).json({ mensagem: 'Erro interno ao criar professor', erro: error.message });
    }
});

router.get('/aluno/:id', async (req, res) => {
    try {
        const aluno = await Aluno.findByPk(req.params.id, {
            include: [
                { model: Responsavel, as: 'responsavel' },
                { model: Turma, as: 'turma' }
            ]
        });

        if (!aluno) {
            return res.status(404).json({ mensagem: 'Aluno não encontrado' });
        }
        res.status(200).json(aluno);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar aluno', erro: error.message });
    }
});

export default router;