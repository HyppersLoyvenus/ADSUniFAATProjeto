import Presenca from '../Models/Presenca.js';
const PresencaController = {

  async getAll(req, res) {
    try {
      const presencas = await Presenca.findAll();
      return res.status(200).json(presencas);
    } catch (error) {
      console.error("Erro ao buscar registros de presença:", error);
      return res.status(500).json({ error: "Ocorreu um erro no servidor ao buscar os registros de presença." });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const presenca = await Presenca.findByPk(id);

      if (!presenca) {
        return res.status(404).json({ error: "Registro de presença não encontrado." });
      }

      return res.status(200).json(presenca);
    } catch (error) {
      console.error("Erro ao buscar presença por ID:", error);
      return res.status(500).json({ error: "Ocorreu um erro no servidor ao buscar o registro de presença." });
    }
  },

  async create(req, res) {
    try {
      const novaPresenca = await Presenca.create(req.body);
      return res.status(201).json(novaPresenca);
    } catch (error) {
      // Trata erros de validação do Sequelize (ex: status inválido).
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message).join(', ');
        return res.status(400).json({ error: `Dados inválidos: ${messages}` });
      }
      console.error("Erro ao criar registro de presença:", error);
      return res.status(500).json({ error: "Ocorreu um erro ao criar o registro de presença." });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Presenca.update(req.body, { where: { id: id } });

      if (!updated) {
        return res.status(404).json({ error: "Registro de presença não encontrado." });
      }

      const presencaAtualizada = await Presenca.findByPk(id);
      return res.status(200).json(presencaAtualizada);
    } catch (error) {
      // Trata erros de validação do Sequelize (ex: status inválido).
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message).join(', ');
        return res.status(400).json({ error: `Dados inválidos: ${messages}` });
      }
      console.error("Erro ao atualizar presença:", error);
      return res.status(500).json({ error: "Ocorreu um erro ao atualizar o registro de presença." });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Presenca.destroy({ where: { id: id } });

      if (!deleted) {
        return res.status(404).json({ error: "Registro de presença não encontrado." });
      }

      return res.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar presença:", error);
      return res.status(500).json({ error: "Ocorreu um erro ao deletar o registro de presença." });
    }
  }
};

export default PresencaController;