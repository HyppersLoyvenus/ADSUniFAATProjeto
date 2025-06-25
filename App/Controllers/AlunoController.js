import Aluno from '../Models/Aluno.js';

const AlunoController = {

    // Lista todos os alunos ativos.
    async getAll(req, res) {
        try {
            const alunos = await Aluno.findAll({ where: { status_matricula: 'Ativo' } });
            return res.status(200).json(alunos);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Ocorreu um erro no servidor." });
        }
    },

    // Busca um aluno específico pelo seu ID.
    async getById(req, res) {
        try {
            const { id } = req.params;
            const aluno = await Aluno.findByPk(id);

            if (!aluno) {
                return res.status(404).json({ error: "Aluno não encontrado." });
            }

            return res.status(200).json(aluno);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Ocorreu um erro no servidor." });
        }
    },

    // Cria um novo aluno.
    async create(req, res) {
        try {
            const { nome, data_nascimento, data_matricula, status_matricula, id_responsavel, id_turma } = req.body;

            if (!nome || !data_nascimento || !data_matricula || !status_matricula || !id_responsavel) {
                return res.status(400).json({ error: "Campos obrigatórios não foram preenchidos." });
            }

            const novoAluno = await Aluno.create({
                nome,
                data_nascimento,
                data_matricula,
                status_matricula,
                id_responsavel,
                id_turma
            });

            return res.status(201).json(novoAluno);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Ocorreu um erro ao criar o aluno." });
        }
    },

    // Atualiza os dados de um aluno.
    async update(req, res) {
        try {
            const { id } = req.params;
            const dadosParaAtualizar = req.body;

            const aluno = await Aluno.findByPk(id);
            if (!aluno) {
                return res.status(404).json({ error: "Aluno não encontrado para atualização." });
            }

            await Aluno.update(dadosParaAtualizar, { where: { id: id } });

            const alunoAtualizado = await Aluno.findByPk(id);
            return res.status(200).json(alunoAtualizado);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Ocorreu um erro ao atualizar o aluno." });
        }
    },

    // Alteração do status para inativo
    async delete(req, res) {
        try {
            const { id } = req.params;
            const aluno = await Aluno.findByPk(id);

            if (!aluno) {
                return res.status(404).json({ error: "Aluno não encontrado." });
            }

            // Altera o status em vez de remover do banco
            aluno.status_matricula = 'Inativo';
            await aluno.save();

            return res.status(204).send();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Ocorreu um erro ao deletar o aluno." });
        }
    }
};

export default AlunoController;