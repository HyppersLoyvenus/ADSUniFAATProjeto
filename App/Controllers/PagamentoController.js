import Pagamento from '../Models/Pagamento.js';
const PagamentoController = {

  async getAll(req, res) {
    try {
      const pagamentos = await Pagamento.findAll();
      return res.status(200).json(pagamentos);
    } catch (error) {
      console.error("Erro ao buscar pagamentos:", error);
      return res.status(500).json({ error: "Ocorreu um erro no servidor ao buscar pagamentos." });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const pagamento = await Pagamento.findByPk(id);

      if (!pagamento) {
        return res.status(404).json({ error: "Pagamento não encontrado." });
      }

      return res.status(200).json(pagamento);
    } catch (error) {
      console.error("Erro ao buscar pagamento por ID:", error);
      return res.status(500).json({ error: "Ocorreu um erro no servidor ao buscar o pagamento." });
    }
  },

  async create(req, res) {
    try {
      const novoPagamento = await Pagamento.create(req.body);
      return res.status(201).json(novoPagamento);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message).join(', ');
        return res.status(400).json({ error: `Dados inválidos: ${messages}` });
      }
      console.error("Erro ao criar pagamento:", error);
      return res.status(500).json({ error: "Ocorreu um erro ao criar o pagamento." });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Pagamento.update(req.body, { where: { id: id } });

      if (!updated) {
        return res.status(404).json({ error: "Pagamento não encontrado." });
      }

      const pagamentoAtualizado = await Pagamento.findByPk(id);
      return res.status(200).json(pagamentoAtualizado);
    } catch (error) {
      // Trata erros de validação do Sequelize (ex: status inválido).
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message).join(', ');
        return res.status(400).json({ error: `Dados inválidos: ${messages}` });
      }
      console.error("Erro ao atualizar pagamento:", error);
      return res.status(500).json({ error: "Ocorreu um erro ao atualizar o pagamento." });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Pagamento.destroy({ where: { id: id } });

      if (!deleted) {
        return res.status(404).json({ error: "Pagamento não encontrado." });
      }

      return res.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar pagamento:", error);
      return res.status(500).json({ error: "Ocorreu um erro ao deletar o pagamento." });
    }
  }
};

export default PagamentoController;