import express from "express";
import pacientesController from "./controllers/pacientes/pacientesController.js";
import psicologosController from "./controllers/psicologos/psicologosController.js";

const routes = express.Router();

routes.get("/pacientes", pacientesController.findAllPacientes);
routes.post("/pacientes", pacientesController.createPaciente);
routes.get("/pacientes/:id", pacientesController.findPaciente);
routes.put("/pacientes/:id", pacientesController.updatePaciente);
routes.delete("/pacientes/:id", pacientesController.deletePaciente);

routes.get("/psicologos", psicologosController.findAllPsicologos);
routes.post("/psicologos", psicologosController.createPsicologo);
routes.get("/psicologos/:id", psicologosController.findPsicologo);
routes.put("/psicologos/:id", psicologosController.updatePsicologo);
routes.delete("/psicologos/:id", psicologosController.deletePsicologo);

export default routes;
