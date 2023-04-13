import db from '../db/db.js';
import { DataTypes } from 'sequelize';

const psicologos = db.define(
  'psicologos',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: 'email',
    },
    senha: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    apresentacao: {
      type: DataTypes.STRING(45),
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
    tableName: 'psicologos',
  },
);

export default psicologos;
