import { hash } from "bcryptjs";
import { PrismaUsersRepository } from "../../repositories/prisma-user-repository";

interface CreateUserServicesInt {
  email: string;
  passwordhash: string;
  username: string;
}

export async function CreateUserServices({
  email,
  passwordhash,
  username,
}: CreateUserServicesInt) {
  const prismaUsersRepository = new PrismaUsersRepository();
  const password = await hash(passwordhash, 6);

  await prismaUsersRepository.checkEmailExists(email);
  await prismaUsersRepository.checkUsernameExistsForCreation(username);

  const userCreated = prismaUsersRepository.create({
    email,
    password,
    username,
  });

  return { userCreated };
}
