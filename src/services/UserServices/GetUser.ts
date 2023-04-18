import { PrismaUsersRepository } from "../../repositories/prisma-user-repository";

export async function GetUniqueUser(userId: string) {
  const prismaUsersRepository = new PrismaUsersRepository();

  const findUser = await prismaUsersRepository.getById(userId);

  return findUser;
}
