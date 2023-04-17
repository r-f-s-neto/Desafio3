import { pacientes } from '../models/index.js';

const pacientesController = {
  listarPacientes: async (req, res) => {
    try {
      const listaPacientes = await pacientes.findAll();
      res.status(200).json(listaPacientes);
    } catch (error) {
      return res
        .status(500)
        .json('Erro ao tentar listar os pacientes, tente novamente mais tarde');
    }
  },
  encontrarPaciente: async (req, res) => {
    try {
      const id = req.params.id;
      const paciente = await pacientes.findByPk(id);
      if (paciente) {
        res.status(200).json(paciente);
      } else {
        res.status(404).json('id não encontrado');
      }
    } catch (error) {
      return res
        .status(500)
        .json(
          'Erro ao tentar encontrar o paciente, tente novamente mais tarde',
        );
    }
  },
  deletarPaciente: async (req, res) => {
    try {
      const id = req.params.id;
      const verify = await pacientes.destroy({
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
        .json('Erro ao tentar deletar o paciente, tente novamente mais tarde');
    }
  },
  createPacientes: async (req, res) => {
    try {
      const { nome, email, idade } = req.body;
      const idadeFormatada = idade
        .split(/[-\/ ]/)
        .reverse()
        .join('-');

      const verifyEmail = await pacientes.findOne({
        where: { email },
      });

      if (!verifyEmail) {
        const dados = await pacientes.create({
          nome,
          email,
          idade: idadeFormatada,
        });
        return res.status(201).json(dados);
      } else {
        return res
          .status(400)
          .json('email já cadastrado na plataforma, insira outro email');
      }
    } catch (error) {
      return res
        .status(500)
        .json(
          'Erro ao tentar cadastrar o paciente, tente novamente mais tarde',
        );
    }
  },
  updatePaciente: async (req, res) => {
    try {
      const { nome, email, idade } = req.body;
      const id = req.params.id;
      const idadeFormatada = idade
        .split(/[-\/ ]/)
        .reverse()
        .join('-');

      const verifyEmail = await pacientes.findOne({
        where: { email },
      });

      const pastPass = verifyEmail && verifyEmail.id == id;

      if (!verifyEmail || pastPass) {
        const pacienteUpdated = await pacientes.update(
          {
            nome,
            email,
            idade: idadeFormatada,
          },
          {
            where: { id },
          },
        );

        if (pacienteUpdated[0]) {
          return res.status(200).json({ nome, email, idade });
        } else {
          return res.status(400).json('id não encontrado');
        }
      } else {
        return res
          .status(400)
          .json('email já cadastrado na plataforma, insira outro email');
      }
    } catch (error) {
      return res
        .status(500)
        .json(
          'Erro ao tentar atualizar os dados do paciente, tente novamente mais tarde',
        );
    }
  },
};

export default pacientesController;
