import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  cpf: string;
}) => {
  const { name, email, password, cpf } = data;

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

export const loginUser = async (data: { email: string; password: string }) => {
  const { email, password } = data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Credenciais inválidas");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Credenciais inválidas");

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });

  return { token };
};
