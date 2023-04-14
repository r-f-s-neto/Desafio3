import { psicologos } from '../models/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import key from '../configs/secret.js';
const authController = {
  authLogin: async (req, res) => {
    try {
      const { email, senha } = req.body;
      const user = await psicologos.findOne({
        where: { email },
      });
      if (!user) {
        return res.status(401).json('email ou senha não encontrado');
      } else {
        const verify = bcrypt.compareSync(senha, user.senha);
        if (!verify) {
          return res.status(401).json('email ou senha não encontrado');
        } else {
          const token = jwt.sign(
            {
              id: user.id,
              nome: user.nome,
              email: user.email,
            },
            key,
          );
          return res.status(200).json(token);
        }
      }
    } catch (error) {
      return res
        .status(500)
        .json('Erro ao tentar efetuar o login, tente novamente mais tarde');
    }
  },
};

export default authController;
