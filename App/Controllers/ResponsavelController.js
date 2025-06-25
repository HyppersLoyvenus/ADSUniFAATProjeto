import Responsavel from '../Models/Responsavel.js';

const ResponsavelController = {

    // Lista todos os responsaveis ativos.
    async getAll(req, res) {
        try {
            const responsaveis = await Responsavel.findAll();
            return res.status(200).json(responsaveis);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Ocorreu um erro no servidor." });
        }
    },

    // Busca um responsavel específico pelo seu ID.
    async getById(req, res) {
        try {
            const { id } = req.params;
            const responsavel = await Responsavel.findByPk(id);
            if (!responsavel) {
                return res.status(404).json({ error: "Responsável não encontrado." });
            }
            return res.status(200).json(responsavel);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Ocorreu um erro no servidor." });
        }
    },

    // Cria um novo responsavel.
    async create(req, res) {
        try {
            const novoResponsavel = await Responsavel.create(req.body);
            return res.status(201).json(novoResponsavel);
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).json({ error: 'CPF ou Email já cadastrado.' });
            }
            console.error(error);
            return res.status(500).json({ error: "Ocorreu um erro ao criar o responsável." });
        }
    },

    // Atualiza os dados de um responsavel.
    async update(req, res) {
        try {
            const { id } = req.params;
            const [updated] = await Responsavel.update(req.body, { where: { id: id } });
            if (!updated) {
                return res.status(404).json({ error: "Responsável não encontrado." });
            }
            const responsavelAtualizado = await Responsavel.findByPk(id);
            return res.status(200).json(responsavelAtualizado);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Ocorreu um erro ao atualizar o responsável." });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Responsavel.destroy({ where: { id: id } });
            if (!deleted) {
                return res.status(404).json({ error: "Responsável não encontrado." });
            }

            return res.status(204).send();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Ocorreu um erro ao deletar o responsável." });
        }
    }
};

export default ResponsavelController;