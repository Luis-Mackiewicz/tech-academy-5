import prisma from "../prisma/client";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  validateCPF,
  validateEmail,
  validatePassword,
} from "../utils/validators";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const registerUser = async (data: any) => {
  const { name, email, password, cpf } = data;

  if (!name || !email || !password || !cpf) {
    throw new Error("Todos os campos são obrigatórios");
  }

  if (!validateEmail(email)) throw new Error("E-mail inválido");
  if (!validateCPF(cpf)) throw new Error("CPF inválido");
  if (!validatePassword(password)) throw new Error("Senha fraca");

  const emailExists = await prisma.user.findUnique({ where: { email } });
  if (emailExists) throw new Error("E-mail já cadastrado");

  const cpfExists = await prisma.user.findUnique({ where: { cpf } });
  if (cpfExists) throw new Error("CPF já cadastrado");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, cpf, password: hashedPassword },
  });

  return { id: user.id, name: user.name, email: user.email };
};

export const loginUser = async (data: any) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("E-mail e senha são obrigatórios");
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Credenciais inválidas");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Credenciais inválidas");

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });

  return { token };
};
