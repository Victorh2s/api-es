import { IntPrismaUserRepository } from "../../repositories/interfaces/int-prisma-user-repository";

export class UpdateUserServices {
  constructor(private prismaUsersRepository: IntPrismaUserRepository) {}

  async execute(userId: string, username: string, description: string) {
    await this.prismaUsersRepository.getById(userId);

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
