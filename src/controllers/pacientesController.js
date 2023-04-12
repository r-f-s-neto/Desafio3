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
};

export default pacientesController;
