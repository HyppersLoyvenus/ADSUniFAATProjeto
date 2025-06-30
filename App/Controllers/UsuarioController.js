import Usuario from '../Models/Usuario.js';

const UsuarioController = {

  async getAll(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      return res.status(200).json(usuarios);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Ocorreu um erro no servidor." });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }
      return res.status(200).json(usuario);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Ocorreu um erro no servidor." });
    }
  },

  async create(req, res) {
    try {
      const novoUsuario = await Usuario.create(req.body);
      return res.status(201).json(novoUsuario);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Ocorreu um erro ao criar o usuário." });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Usuario.update(req.body, { where: { id: id } });
      if (!updated) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }
      const usuarioAtualizado = await Usuario.findByPk(id);
      return res.status(200).json(usuarioAtualizado);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Ocorreu um erro ao atualizar o usuário." });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Usuario.destroy({ where: { id: id } });
      if (!deleted) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Ocorreu um erro ao deletar o usuário." });
    }
  }

};

export default UsuarioController;