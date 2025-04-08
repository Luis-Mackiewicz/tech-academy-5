import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "CORS está funcionando!" });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
