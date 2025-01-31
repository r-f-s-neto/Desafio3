import key from '../configs/secret.js';
import { atendimentos, pacientes, psicologos } from '../models/index.js';
import jwt from 'jsonwebtoken';

const atendimentosController = {
  listarAtendimentos: async (req, res) => {
    try {
      const listaAtendimentos = await atendimentos.findAll({
        include: [psicologos, pacientes],
      });
      return res.status(200).json(listaAtendimentos);
    } catch (error) {
      return res
        .status(500)
        .json(
          'Erro ao tentar listar os atendimentos, tente novamente mais tarde',
        );
    }
  },
  encontrarAtendimento: async (req, res) => {
    try {
      const id = req.params.id;
      const atendimento = await atendimentos.findByPk(id, {
        include: [psicologos, pacientes],
      });
      if (atendimento) {
        return res.status(200).json(atendimento);
      } else {
        return res.status(404).send('id não encontrado');
      }
    } catch (error) {
      return res
        .status(500)
        .json(
          'Erro ao tentar encontrar o atendimento, tente novamente mais tarde',
        );
    }
  },
  deletarAtendimento: async (req, res) => {
    try {
      const id = req.params.id;
      const verify = await atendimentos.destroy({
        where: { id },
      });
      if (verify) {
        return res.status(204).send();
      } else {
        return res.status(404).json('id não encontrado');
      }
    } catch (error) {
      return res
        .status(500)
        .json(
          'Erro ao tentar deletar o atendimento, tente novamente mais tarde',
        );
    }
  },
  criarAtendimento: async (req, res) => {
    try {
      const { paciente_id, data_atendimento, observacao } = req.body;
      const verifyPaciente = await pacientes.findByPk(paciente_id);
      if (verifyPaciente) {
        const token = req.headers.authorization.replace('Bearer ', '');
        const psicologo_id = jwt.verify(token, key).id;

        const arrayAtendimentos = await atendimentos.findAll({
          where: { pacientes_id: paciente_id },
        });
        const timeStamp = Date.parse(data_atendimento);
        const date = new Date(timeStamp);
        //console.log(arrayAtendimentos);
        const arrayAtendimentosFiltered = arrayAtendimentos.filter((e) => {
          return e.dataValues.data.getTime() === date.getTime();
        });

        if (!arrayAtendimentosFiltered.length) {
          const newAtendimento = await atendimentos.create({
            pacientes_id: paciente_id,
            psicologos_id: psicologo_id,
            data: data_atendimento,
            observacao,
          });
          return res.status(201).json(newAtendimento);
        } else {
          return res
            .status(400)
            .json('este paciente já possui agendamento para esta data e hora');
        }
      } else {
        return res.status(400).json('id do paciente não encontrado');
      }
    } catch (error) {
      return res
        .status(500)
        .json(
          'Erro ao tentar criar o atendimento, , tente novamente mais tarde',
        );
    }
  },
};
export default atendimentosController;
