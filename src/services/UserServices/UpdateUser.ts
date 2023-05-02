import { IntPrismaUserRepository } from "../../repositories/prisma/interfaces/int-prisma-user-repository";

interface UpdateUserServicesInt {
  userId: string;
  username: string;
  description: string;
}

export class UpdateUserServices {
  constructor(private prismaUsersRepository: IntPrismaUserRepository) {}

  async execute({ userId, username, description }: UpdateUserServicesInt) {
    await this.prismaUsersRepository.checkUsernameExistsForUpdate(
      username,
      userId
    );

    const updatedUser = await this.prismaUsersRepository.update(
      userId,
      username,
      description
    );

    return updatedUser;
  }
}
