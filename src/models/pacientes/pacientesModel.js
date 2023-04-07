import { Sequelize } from "sequelize";
import db from "../../db/db.js";

const Paciente = db.define("paciente", {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  data_nascimento: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  telefone: {
    type: Sequelize.INTEGER,
  },
});

export default Paciente;
