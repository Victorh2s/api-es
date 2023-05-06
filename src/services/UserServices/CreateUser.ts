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
    await this.prismaUsersRepository.checkEmailExists(email);
    await this.prismaUsersRepository.checkUsernameExistsForCreation(username);
    await this.prismaUsersRepository.checkUsername(username);
    await this.prismaUsersRepository.checkPassword(passwordhash);
    const password = await hash(passwordhash, 6);

    const user = this.prismaUsersRepository.create({
      email,
      password,
      username,
    });

    return { user };
  }
}
