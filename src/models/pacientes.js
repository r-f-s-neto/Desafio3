import db from '../db/db.js';
import { DataTypes } from 'sequelize';

const pacientes = db.define(
  'pacientes',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
    telefone: {
      type: DataTypes.STRING(22),
      allowNull: false,
    },
    data_de_nascimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'pacientes',
  },
);

export default pacientes;
