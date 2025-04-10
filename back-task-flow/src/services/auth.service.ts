import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const SALT_ROUNDS = 10;

const ERRORS = {
  EMAIL_EXISTS: "E-mail já cadastrado",
  CPF_EXISTS: "CPF já cadastrado",
  INVALID_CREDENTIALS: "Credenciais inválidas",
};

interface RegisterData {
  name: string;
  email: string;
  password: string;
  cpf: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  const { name, email, password, cpf } = data;

  const userRepository = AppDataSource.getRepository(User);

  const [emailExists, cpfExists] = await Promise.all([
    userRepository.findOneBy({ email }),
    userRepository.findOneBy({ cpf }),
  ]);

  if (emailExists) throw new Error(ERRORS.EMAIL_EXISTS);
  if (cpfExists) throw new Error(ERRORS.CPF_EXISTS);

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser = userRepository.create({
    name,
    email,
    cpf,
    password: hashedPassword,
  });

  await userRepository.save(newUser);

  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  };
};

export const loginUser = async (data: LoginData) => {
  const { email, password } = data;

  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: { email },
    select: ["id", "password"],
  });

  if (!user) throw new Error(ERRORS.INVALID_CREDENTIALS);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error(ERRORS.INVALID_CREDENTIALS);

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });

  return { token };
};
