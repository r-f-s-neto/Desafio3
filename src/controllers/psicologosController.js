import { psicologos } from '../models/index.js';

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
};

export default psicologosController;
