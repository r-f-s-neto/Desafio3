import { atendimentos, pacientes, psicologos } from '../models/index.js';

const dashboardController = {
  numeroAtendimentos: async (req, res) => {
    const appointment = await atendimentos.findAll();
    return res.status(200).json(appointment.length);
  },
  numeroPacientes: async (req, res) => {
    const pac = await pacientes.findAll();
    return res.status(200).json(pac.length);
  },
  numeroPsicologos: async (req, res) => {
    const psi = await psicologos.findAll();
    return res.status(200).json(psi.length);
  },
  media: async (req, res) => {
    const appoint = await atendimentos.findAll();
    const numAppoint = appoint.length;

    const psi = await psicologos.findAll();
    const numPsi = psi.length;
    const med = numAppoint / numPsi;
    return res.status(200).json(med);
  },
};

export default dashboardController;
