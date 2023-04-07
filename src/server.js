import express from "express";
import db from "./db/db.js";
import routes from "./routes.js";

const app = express();

app.use(express.json());
app.use(routes);

try {
  await db.sync({ alter: true });
  console.log("A conexão com o db foi bem sucedida");

  app.listen(3333, () => {
    console.log("Servidor iniciado na porta 3333");
  });
} catch (error) {
  console.log("Não foi possivel se conectar com o db", error);
  process.exit(1);
}