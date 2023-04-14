import db from '../db/db.js';
import { DataTypes } from 'sequelize';
import pacientes from './pacientes.js';
import psicologos from './psicologos.js';

const atendimentos = db.define(
  'atendimentos',
  {
    pacientes_id: {
      type: DataTypes.INTEGER,
      references: {
        model: pacientes,
        key: 'id',
      },
    },
    psicologos_id: {
      type: DataTypes.INTEGER,
      references: {
        model: psicologos,
        key: 'id',
      },
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    observacao: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'atendimentos',
  },
);

export default atendimentos;
