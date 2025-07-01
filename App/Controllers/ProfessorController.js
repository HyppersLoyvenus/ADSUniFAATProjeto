import Professor from '../Models/Professor.js';
const ProfessorController = {

  async getAll(req, res) {
    try {
      const professores = await Professor.findAll();
      return res.status(200).json(professores);
    } catch (error) {
      console.error("Erro ao buscar professores:", error);
      return res.status(500).json({ error: "Ocorreu um erro no servidor ao buscar professores." });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const professor = await Professor.findByPk(id);

      if (!professor) {
        return res.status(404).json({ error: "Professor não encontrado." });
      }

      return res.status(200).json(professor);
    } catch (error) {
      console.error("Erro ao buscar professor por ID:", error);
      return res.status(500).json({ error: "Ocorreu um erro no servidor ao buscar o professor." });
    }
  },

  async create(req, res) {
    try {
      const novoProfessor = await Professor.create(req.body);
      return res.status(201).json(novoProfessor);
    } catch (error) {
      // Trata erros de validação do Sequelize (ex: email ou cpf duplicado)
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ error: 'Erro de conflito: ' + error.errors.map(e => e.message).join(', ') });
      }
      console.error("Erro ao criar professor:", error);
      return res.status(500).json({ error: "Ocorreu um erro ao criar o professor." });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Professor.update(req.body, { where: { id: id } });

      if (!updated) {
        return res.status(404).json({ error: "Professor não encontrado." });
      }

      const professorAtualizado = await Professor.findByPk(id);
      return res.status(200).json(professorAtualizado);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ error: 'Erro de conflito: ' + error.errors.map(e => e.message).join(', ') });
      }
      console.error("Erro ao atualizar professor:", error);
      return res.status(500).json({ error: "Ocorreu um erro ao atualizar o professor." });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Professor.destroy({ where: { id: id } });

      if (!deleted) {
        return res.status(404).json({ error: "Professor não encontrado." });
      }

      return res.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar professor:", error);
      return res.status(500).json({ error: "Ocorreu um erro ao deletar o professor." });
    }
  }
};

export default ProfessorController;