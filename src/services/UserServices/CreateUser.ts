import { hash } from "bcryptjs";
import { IntPrismaUserRepository } from "../../repositories/interfaces/int-prisma-user-repository";

interface CreateUserServicesInt {
  email: string;
  passwordhash: string;
  username: string;
}

export class CreateUserServices {
  constructor(private prismaUsersRepository: IntPrismaUserRepository) {}

  async execute({ email, passwordhash, username }: CreateUserServicesInt) {
    const password = await hash(passwordhash, 6);

    await this.prismaUsersRepository.checkEmailExists(email);
    await this.prismaUsersRepository.checkUsernameExistsForCreation(username);

    const userCreated = this.prismaUsersRepository.create({
      email,
      password,
      username,
    });

    return { userCreated };
  }
}
