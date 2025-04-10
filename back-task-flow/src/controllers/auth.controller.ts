import { Request, Response, NextFunction } from "express";
import { registerSchema, loginSchema } from "../utils/validators";
import { registerUser, loginUser } from "../services/auth.service";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const user = await registerUser(validatedData);
    res.status(201).json(user);
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ message: error.errors[0].message });
    } else {
      res.status(400).json({ message: error.message });
    }
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const token = await loginUser(validatedData);
    res.status(200).json({ token });
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ message: error.errors[0].message });
    } else {
      res.status(401).json({ message: error.message });
    }
    next(error);
  }
};
