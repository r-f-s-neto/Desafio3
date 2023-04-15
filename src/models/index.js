import pacientes from './pacientes.js';
import psicologos from './psicologos.js';
import atendimentos from './atendimentos.js';

atendimentos.belongsTo(pacientes, {
  onDelete: 'CASCADE',
  foreignKey: 'pacientes_id',
});
pacientes.hasMany(atendimentos, {
  foreignKey: 'pacientes_id',
});

atendimentos.belongsTo(psicologos, {
  onDelete: 'CASCADE',
  foreignKey: 'psicologos_id',
});
psicologos.hasMany(atendimentos, {
  foreignKey: 'psicologos_id',
});

export { pacientes, psicologos, atendimentos };
