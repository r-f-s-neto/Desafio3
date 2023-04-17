import { psicologos } from '../models/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import key from '../configs/secret.js';

const psicologosController = {
  listarPsicologos: async (req, res) => {
    try {
      const listaPsicologos = await psicologos.findAll();
      res.status(200).json(listaPsicologos);
    } catch (error) {
      return res
        .status(500)
        .json('Erro ao tentar lista os psicologos, tente novamente mais tarde');
    }
  },
  encontrarPsicologo: async (req, res) => {
    try {
      const id = req.params.id;
      const psicologo = await psicologos.findByPk(id);
      if (psicologo) {
        res.status(200).json(psicologo);
      } else {
        res.status(404).send('id não encontrado');
      }
    } catch (error) {
      return res
        .status(500)
        .json(
          'Erro ao tentar procurar o psicologo, tente novamente mais tarde',
        );
    }
  },
  deletarPsicologo: async (req, res) => {
    try {
      const id = req.params.id;
      const verify = await psicologos.destroy({
        where: { id },
      });
      if (verify) {
        return res.status(204).send();
      } else {
        return res.status(404).json('id não encontrado');
      }
    } catch (error) {
      return res
        .status(500)
        .json('Erro ao tentar deletar o psicologo, tente novamente mais tarde');
    }
  },
  createPsicologos: async (req, res) => {
    try {
      const { nome, email, senha, apresentacao } = req.body;
      const senhaCript = bcrypt.hashSync(senha, 10);

      const verifyEmail = await psicologos.findOne({
        where: { email },
      });
      if (!verifyEmail) {
        const dados = await psicologos.create({
          nome,
          email,
          senha: senhaCript,
          apresentacao,
        });
        return res.status(201).json(dados);
      } else {
        return res
          .status(400)
          .json('email já cadastrado na plataforma, insira outro email');
      }
    } catch (error) {
      return res
        .status(500)
        .json(
          'Erro ao tentar cadastrar o psicologo, tente novamente mais tarde',
        );
    }
  },
  updatePsicologo: async (req, res) => {
    try {
      const { nome, email, senha, apresentacao } = req.body;
      const id = req.params.id;
      const token = req.headers.authorization.replace('Bearer ', '');
      const psic_id = jwt.verify(token, key).id;

      if (psic_id == id) {
        const verifyEmail = await psicologos.findOne({
          where: { email },
        });
        if (!verifyEmail) {
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

          if (psicologoUpdated[0]) {
            return res
              .status(200)
              .json({ nome, email, senhaCript, apresentacao });
          } else {
            return res.status(400).json('id não encontrado');
          }
        } else {
          return res
            .status(400)
            .json('email já cadastrado na plataforma, insira outro email');
        }
      } else {
        return res
          .status(401)
          .json('o psicologo só pode atualizar os proprios dados');
      }
    } catch (error) {
      return res
        .status(500)
        .json(
          'Erro ao tentar atualizar os dados do psicologo, tente novamente mais tarde',
        );
    }
  },
};

export default psicologosController;
