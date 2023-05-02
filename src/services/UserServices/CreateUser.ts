import { hash } from "bcryptjs";
import { User } from "@prisma/client";
import { IntPrismaUserRepository } from "../../repositories/prisma/interfaces/int-prisma-user-repository";

interface CreateUserServicesInt {
  email: string;
  passwordhash: string;
  username: string;
}

export class CreateUserServices {
  constructor(private prismaUsersRepository: IntPrismaUserRepository) {}

  async execute({
    email,
    passwordhash,
    username,
  }: CreateUserServicesInt): Promise<{
    user: Promise<User>;
  }> {
    const password = await hash(passwordhash, 6);

    await this.prismaUsersRepository.checkEmailExists(email);
    await this.prismaUsersRepository.checkUsernameExistsForCreation(username);

    const user = this.prismaUsersRepository.create({
      email,
      password,
      username,
    });

    return { user };
  }
}
