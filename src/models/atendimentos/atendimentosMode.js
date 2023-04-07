import { Sequelize } from "sequelize";
import db from "../../db/db.js";
import Psicologo from "../psicologos/psicologosModel.js";
import Paciente from "../pacientes/pacientesModel.js";

const Atendimento = db.define("atendimento", {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  observacao: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  paciente_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    references: {
      model: Paciente,
      key: "id",
    },
  },
  psicologo_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    references: {
      model: Psicologo,
      key: "id",
    },
  },
});

export default Atendimento;
