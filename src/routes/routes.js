import { Router } from 'express';
import pacientesController from '../controllers/pacientesController.js';
import psicologosController from '../controllers/psicologosController.js';
import atendimentosController from '../controllers/atendimentosController.js';
import authController from '../controllers/authController.js';
import auth from '../middlewares/auth.js';
import createPacValid from '../middlewares/validations/createPacValid.js';
import createPsiValid from '../middlewares/validations/createPsiValid.js';
import loginValid from '../middlewares/validations/loginValid.js';
import dashboardController from '../controllers/dashboardController.js';

const routes = Router();

routes.get('/pacientes', pacientesController.listarPacientes);
routes.get('/pacientes/:id', auth, pacientesController.encontrarPaciente);
routes.get('/psicologos', psicologosController.listarPsicologos);
routes.get('/psicologos/:id', auth, psicologosController.encontrarPsicologo);
routes.get('/atendimentos', atendimentosController.listarAtendimentos);
routes.get(
  '/atendimentos/:id',
  auth,
  atendimentosController.encontrarAtendimento,
);
routes.delete('/pacientes/:id', auth, pacientesController.deletarPaciente);
routes.delete('/psicologos/:id', auth, psicologosController.deletarPsicologo);
routes.delete(
  '/atendimentos/:id',
  auth,
  atendimentosController.deletarAtendimento,
);
routes.post(
  '/psicologos',
  createPsiValid,
  psicologosController.createPsicologos,
);
routes.post('/pacientes', createPacValid, pacientesController.createPacientes);
routes.put(
  '/psicologos/:id',
  auth,
  createPsiValid,
  psicologosController.updatePsicologo,
);
routes.put(
  '/pacientes/:id',
  auth,
  createPacValid,
  pacientesController.updatePaciente,
);
routes.post('/login', loginValid, authController.authLogin);
routes.post('/atendimentos/', auth, atendimentosController.criarAtendimento);
routes.get(
  '/dashboard/numero-atendimento',
  dashboardController.numeroAtendimentos,
);
routes.get('/dashboard/numero-paciente', dashboardController.numeroPacientes);
routes.get('/dashboard/numero-psicologo', dashboardController.numeroPsicologos);
routes.get('/dashboard/media', dashboardController.media);
routes.get('/dashboard/media/:id', auth, dashboardController.mediaPerPsicologo);

export default routes;
