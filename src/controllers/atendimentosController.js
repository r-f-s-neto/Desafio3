import { atendimentos, pacientes, psicologos } from '../models/index.js';

const atendimentosController = {
  listarAtendimentos: async (req, res) => {
    const listaAtendimentos = await atendimentos.findAll({
      include: [psicologos, pacientes],
    });
    return res.status(200).json(listaAtendimentos);
  },
  encontrarAtendimento: async (req, res) => {
    const id = req.params.id;
    const atendimento = await atendimentos.findByPk(id, {
      include: [psicologos, pacientes],
    });
    if (atendimento) {
      return res.status(200).json(atendimento);
    } else {
      return res.status(404).send('id não encontrado');
    }
  },
  deletarAtendimento: async (req, res) => {
    const id = req.params.id;
    const verify = await atendimentos.destroy({
      where: { id },
    });
    if (verify) {
      return res.status(204).send();
    } else {
      return res.status(404).json('id não encontrado');
    }
  },
};
export default atendimentosController;
