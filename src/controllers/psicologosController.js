import { psicologos } from '../models/index.js';
import bcrypt from 'bcryptjs';

const psicologosController = {
  listarPsicologos: async (req, res) => {
    const listaPsicologos = await psicologos.findAll();
    res.status(200).json(listaPsicologos);
  },
  encontrarPsicologo: async (req, res) => {
    const id = req.params.id;
    const psicologo = await psicologos.findByPk(id);
    if (psicologo) {
      res.status(200).json(psicologo);
    } else {
      res.status(404).send('id não encontrado');
    }
  },
  deletarPsicologo: async (req, res) => {
    const id = req.params.id;
    const verify = await psicologos.destroy({
      where: { id },
    });
    if (verify) {
      return res.status(204).send();
    } else {
      return res.status(404).json('id não encontrado');
    }
  },
  createPsicologos: async (req, res) => {
    const { nome, email, senha, apresentacao } = req.body;
    const senhaCript = bcrypt.hashSync(senha, 10);
    if (nome && email && senha && apresentacao) {
      const dados = await psicologos.create({
        nome,
        email,
        senha: senhaCript,
        apresentacao,
      });
      return res.status(201).json(dados);
    } else {
      return res.status(400).json('todos os dados devem ser informados');
    }
  },
  updatePsicologo: async (req, res) => {
    const { nome, email, senha, apresentacao } = req.body;
    const id = req.params.id;
    if (nome && email && senha && apresentacao) {
      const senhaCript = bcrypt.hashSync(senha, 10);
      const psicologoUpdated = await psicologos.update(
        {
          nome,
          email,
          senha: senhaCript,
          apresentacao,
        },
        {
          where: { id },
        },
      );

      console.log(psicologoUpdated);

      if (psicologoUpdated[0]) {
        return res.status(200).json({ nome, email, senhaCript, apresentacao });
      } else {
        return res.status(400).json('id não encontrado');
      }
    } else {
      return res.status(400).json('todos os dados devem ser preenchidos');
    }
  },
};

export default psicologosController;
