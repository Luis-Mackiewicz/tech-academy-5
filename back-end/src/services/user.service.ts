import prisma from "../prisma/client";

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: { id: true, name: true, email: true, cpf: true },
  });
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id, 10) },
  });
  if (!user) throw new Error("Usuário não encontrado");
  return user;
};

export const updateUser = async (
  id: string,
  data: { name?: string; email?: string }
) => {
  return await prisma.user.update({
    where: { id: parseInt(id, 10) },
    data,
  });
};

export const deleteUser = async (id: string) => {
  return await prisma.user.delete({ where: { id: parseInt(id, 10) } });
};
