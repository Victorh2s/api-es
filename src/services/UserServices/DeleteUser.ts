import { PrismaUsersRepository } from "../../repositories/prisma-user-repository";

export async function DeleteUserServices(userId: string) {
  const prismaUsersRepository = new PrismaUsersRepository();

  await prismaUsersRepository.getById(userId);

  const userDeleted = await prismaUsersRepository.delete(userId);

  return userDeleted;
}
