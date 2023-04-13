import { pacientes } from '../models/index.js';

const pacientesController = {
  listarPacientes: async (req, res) => {
    const listaPacientes = await pacientes.findAll();
    res.status(200).json(listaPacientes);
  },
  encontrarPaciente: async (req, res) => {
    const id = req.params.id;
    const paciente = await pacientes.findByPk(id);
    if (paciente) {
      res.status(200).json(paciente);
    } else {
      res.status(404).json('id não encontrado');
    }
  },
  deletarPaciente: async (req, res) => {
    const id = req.params.id;
    const verify = await pacientes.destroy({
      where: { id },
    });
    if (verify) {
      return res.status(204).send();
    } else {
      return res.status(404).json('id não encontrado');
    }
  },
  createPacientes: async (req, res) => {
    const { nome, email, idade } = req.body;
    if (nome && email && idade) {
      const idadeFormatada = idade
        .split(/[-\/ ]/)
        .reverse()
        .join('-');
      const dados = await pacientes.create({
        nome,
        email,
        idade: idadeFormatada,
      });
      return res.status(201).json(dados);
    } else {
      return res.status(400).json('todos os dados devem ser informados');
    }
  },
  updatePaciente: async (req, res) => {
    const { nome, email, idade } = req.body;
    const id = req.params.id;
    if (nome && email && idade) {
      const idadeFormatada = idade
        .split(/[-\/ ]/)
        .reverse()
        .join('-');
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
      return res.status(400).json('todos os dados devem ser preenchidos');
    }
  },
};

export default pacientesController;
