import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  cpf: string;
}) => {
  const { name, email, password, cpf } = data;

  const userRepository = AppDataSource.getRepository(User);

  const emailExists = await userRepository.findOneBy({ email });
  if (emailExists) throw new Error("E-mail já cadastrado");

  const cpfExists = await userRepository.findOneBy({ cpf });
  if (cpfExists) throw new Error("CPF já cadastrado");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = userRepository.create({
    name,
    email,
    cpf,
    password: hashedPassword,
  });
  await userRepository.save(user);

  return { id: user.id, name: user.name, email: user.email };
};

export const loginUser = async (data: { email: string; password: string }) => {
  const { email, password } = data;

  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ email });
  if (!user) throw new Error("Credenciais inválidas");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Credenciais inválidas");

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });

  return { token };
};
