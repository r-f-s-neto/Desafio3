import { Router } from 'express';
import pacientesController from '../controllers/pacientesController.js';
import psicologosController from '../controllers/psicologosController.js';
import atendimentosController from '../controllers/atendimentosController.js';

const routes = Router();

routes.get('/pacientes', pacientesController.listarPacientes);
routes.get('/pacientes/:id', pacientesController.encontrarPaciente);
routes.get('/psicologos', psicologosController.listarPsicologos);
routes.get('/psicologos/:id', psicologosController.encontrarPsicologo);
routes.get('/atendimentos', atendimentosController.listarAtendimentos);
routes.get('/atendimentos/:id', atendimentosController.encontrarAtendimento);
routes.delete('/pacientes/:id', pacientesController.deletarPaciente);
routes.delete('/psicologos/:id', psicologosController.deletarPsicologo);
routes.delete('/atendimentos/:id', atendimentosController.deletarAtendimento);

export default routes;
