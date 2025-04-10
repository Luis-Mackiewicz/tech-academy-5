import { Router } from "express";

const router = Router();

// Exemplo de rota de teste
router.get("/", (req, res) => {
  res.json({ message: "Task routes working!" });
});

export default router;
