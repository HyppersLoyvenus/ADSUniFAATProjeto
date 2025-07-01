import Atividade from '../Models/Atividade.js';
const AtividadeController = {

  async getAll(req, res) {
    try {
      const atividades = await Atividade.findAll();
      return res.status(200).json(atividades);
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
      return res.status(500).json({ error: "Ocorreu um erro no servidor ao buscar atividades." });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const atividade = await Atividade.findByPk(id);

      if (!atividade) {
        return res.status(404).json({ error: "Atividade não encontrada." });
      }

      return res.status(200).json(atividade);
    } catch (error) {
      console.error("Erro ao buscar atividade por ID:", error);
      return res.status(500).json({ error: "Ocorreu um erro no servidor ao buscar a atividade." });
    }
  },

  async create(req, res) {
    try {
      const novaAtividade = await Atividade.create(req.body);
      return res.status(201).json(novaAtividade);
    } catch (error) {
       // Trata erros de validação do Sequelize (campos nulos, etc).
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message).join(', ');
        return res.status(400).json({ error: `Dados inválidos: ${messages}` });
      }
      console.error("Erro ao criar atividade:", error);
      return res.status(500).json({ error: "Ocorreu um erro ao criar a atividade." });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Atividade.update(req.body, { where: { id: id } });

      if (!updated) {
        return res.status(404).json({ error: "Atividade não encontrada." });
      }

      const atividadeAtualizada = await Atividade.findByPk(id);
      return res.status(200).json(atividadeAtualizada);
    } catch (error) {
      // Trata erros de validação do Sequelize (campos nulos, etc).
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message).join(', ');
        return res.status(400).json({ error: `Dados inválidos: ${messages}` });
      }
      console.error("Erro ao atualizar atividade:", error);
      return res.status(500).json({ error: "Ocorreu um erro ao atualizar a atividade." });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Atividade.destroy({ where: { id: id } });

      if (!deleted) {
        return res.status(404).json({ error: "Atividade não encontrada." });
      }

      return res.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar atividade:", error);
      return res.status(500).json({ error: "Ocorreu um erro ao deletar a atividade." });
    }
  }
};

export default AtividadeController;