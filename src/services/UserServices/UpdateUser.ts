import { PrismaUsersRepository } from "../../repositories/prisma-user-repository";

export async function UpdateUniqueUser(
  userId: string,
  username: string,
  description: string
) {
  const prismaUsersRepository = new PrismaUsersRepository();

  await prismaUsersRepository.getById(userId);

  await prismaUsersRepository.checkUsernameExistsForUpdate(username, userId);

  const updatedUser = await prismaUsersRepository.update(
    userId,
    username,
    description
  );

  return updatedUser;
}
