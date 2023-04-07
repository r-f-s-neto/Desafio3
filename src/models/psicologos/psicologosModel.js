import { Sequelize } from "sequelize";
import db from "../../db/db.js";

const Psicologo = db.define("psicologo", {
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
  senha: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  apresentacao: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default Psicologo;
