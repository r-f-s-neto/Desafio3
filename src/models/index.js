import Atendimento from "./atendimentos/atendimentosMode.js";
import Paciente from "./pacientes/pacientesModel.js";
import Psicologo from "./psicologos/psicologosModel.js";

Psicologo.hasMany(Atendimento);
Paciente.hasMany(Atendimento);

Atendimento.belongsTo(Psicologo, {
  onDelete: "CASCADE",
  foreignKey: {
    name: "psicologo_id",
    allowNull: false,
  },
});
Atendimento.belongsTo(Paciente, {
  onDelete: "CASCADE",
  foreignKey: {
    name: "paciente_id",
    allowNull: false,
  },
});

export { Psicologo, Paciente, Atendimento };
