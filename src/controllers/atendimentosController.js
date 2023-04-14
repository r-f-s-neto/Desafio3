import key from '../configs/secret.js';
import { atendimentos, pacientes, psicologos } from '../models/index.js';
import jwt from 'jsonwebtoken';

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
  criarAtendimento: async (req, res) => {
    const { paciente_id, data_atendimento, observacao } = req.body;
    const token = req.headers.authorization.replace('Bearer ', '');
    const psicologo_id = jwt.verify(token, key).id;
    const newAtendimento = await atendimentos.create({
      pacientes_id: paciente_id,
      psicologos_id: psicologo_id,
      data: data_atendimento,
      observacao,
    });
    res.status(201).json(newAtendimento);
  },
};
export default atendimentosController;
