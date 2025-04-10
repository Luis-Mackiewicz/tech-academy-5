import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export const getAllUsers = async () => {
  const userRepository = AppDataSource.getRepository(User);
  return await userRepository.find();
};

export const getUserById = async (id: number) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id });
  if (!user) throw new Error("Usuário não encontrado");
  return user;
};

export const updateUser = async (id: number, data: Partial<User>) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id });
  if (!user) throw new Error("Usuário não encontrado");

  if (data.email) throw new Error("Não é permitido alterar o e-mail");

  await userRepository.update(id, data);
  return await userRepository.findOneBy({ id });
};

export const deleteUser = async (id: number) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id });
  if (!user) throw new Error("Usuário não encontrado");

  await userRepository.delete(id);
};
