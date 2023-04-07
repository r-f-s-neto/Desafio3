import { Paciente as PacienteRepository } from "../../models/index.js";

async function findAllPacientes(req, res) {
  try {
    const pacientes = await PacienteRepository.findAll();
    res.status(200).json({ message: "Operação bem-sucedida", data: pacientes });
  } catch (error) {
    console.log("Erro ao recuperar os registros dos pacientes", error);
    res.status(500).json({ message: "Falha na operação", data: [] });
  }
}

async function findPaciente(req, res) {
  const pacienteID = req.params.id;
  try {
    const paciente = await PacienteRepository.findByPk(pacienteID);
    res.status(200).json({ message: "Operação bem-sucedida", data: paciente });
  } catch (error) {
    console.log(
      `Erro ao recuperar os registros do paciente ${pacienteID}`,
      error
    );
    res.status(404).json({ message: "Id não encontrado" });
  }
}

async function createPaciente(req, res) {
  try {
    const createdPaciente = await PacienteRepository.create({
      nome: req.body.nome,
      email: req.body.email,
      data_nascimento: req.body.data_nascimento,
      telefone: req.body.telefone,
    });
    res.status(201).json({ message: "Operação bem-sucedida", data: createdPaciente });
  } catch (error) {
    console.log("Erro ao cadastrar paciente", error);
    res
      .status(400)
      .json({ message: "Ocorreu um erro ao cadastrar o paciente" });
  }
}

async function updatePaciente(req, res) {
  const pacienteID = req.params.id;
  try {
    await PacienteRepository.update(
      {
        nome: req.body.nome,
        email: req.body.email,
        data_nascimento: req.body.data_nascimento,
        telefone: req.body.telefone,
      },
      {
        where: {
          id: pacienteID,
        },
      }
    );
    const updatedPaciente = await PacienteRepository.findByPk(pacienteID);
    res.status(200).json({ message: "Operação bem-sucedida", data: updatedPaciente });
  } catch (error) {
    console.log(
      `Erro ao atualizar os registros do paciente ${pacienteID}`,
      error
    );
    res
      .status(400)
      .json({ message: "Ocorreu um erro ao atualizar o paciente" });
  }
}

async function deletePaciente(req, res) {
  const pacienteID = req.params.id;
  try {
    await PacienteRepository.destroy({
      where: {
        id: pacienteID,
      },
    });
    res.status(204).json({ message: "Operação bem-sucedida" });
  } catch (error) {
    console.log(
      `Erro ao deletar os registros do paciente ${pacienteID}`,
      error
    );
    res.status(400).json({ message: "Ocorreu um erro ao deletar o paciente" });
  }
}

export default {
  findAllPacientes,
  findPaciente,
  createPaciente,
  updatePaciente,
  deletePaciente,
};
