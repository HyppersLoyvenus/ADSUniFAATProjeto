import Turma from '../Models/Turma.js';

const TurmaController = {

  async getAll(req, res) {
    try {
      const turmas = await Turma.findAll();
      return res.status(200).json(turmas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Ocorreu um erro no servidor." });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const turma = await Turma.findByPk(id);
      if (!turma) {
        return res.status(404).json({ error: "Turma não encontrada." });
      }
      return res.status(200).json(turma);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Ocorreu um erro no servidor." });
    }
  },

  async create(req, res) {
    try {
      const novaTurma = await Turma.create(req.body);
      return res.status(201).json(novaTurma);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Ocorreu um erro ao criar a turma." });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Turma.update(req.body, { where: { id: id } });
      if (!updated) {
        return res.status(404).json({ error: "Turma não encontrada." });
      }
      const turmaAtualizada = await Turma.findByPk(id);
      return res.status(200).json(turmaAtualizada);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Ocorreu um erro ao atualizar a turma." });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Turma.destroy({ where: { id: id } });
      if (!deleted) {
        return res.status(404).json({ error: "Turma não encontrada." });
      }
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Ocorreu um erro ao deletar a turma." });
    }
  }
};

export default TurmaController;