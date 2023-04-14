import express from 'express';
import db from './db/db.js';
import routes from './routes/routes.js';
import handleError from './middlewares/handleError.js';

const port = 3333;
const app = express();

app.use(express.json());
app.use(routes);
app.use(handleError);

try {
  await db.sync({ alter: true });
  console.log('A conexão com o banco de dados foi bem sucedida');

  app.listen(3333, () => {
    console.log(`Servidor iniciado na porta ${port}`);
  });
} catch (error) {
  console.log('Não foi possivel se conectar com o banco de dados', error);
  process.exit(1);
}
