import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { registerSchema, loginSchema } from "../utils/validators";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const result = await authService.registerUser(validatedData);
    res.status(201).json(result);
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ errors: error.errors });
    } else if (
      error.message === "E-mail já cadastrado" ||
      error.message === "CPF já cadastrado"
    ) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "Erro ao registrar usuário" });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const result = await authService.loginUser(validatedData);
    res.status(200).json(result);
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(401).json({ message: error.message });
    }
  }
};
