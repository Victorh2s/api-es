import { IntPrismaUserRepository } from "../../repositories/prisma/interfaces/int-prisma-user-repository";

interface UpdateUserServicesInt {
  userId: string;
  UpdateUsername: string;
  UpdateDescription: string;
}

export class UpdateUserServices {
  constructor(private prismaUsersRepository: IntPrismaUserRepository) {}

  async execute({
    userId,
    UpdateUsername,
    UpdateDescription,
  }: UpdateUserServicesInt) {
    const username = UpdateUsername;
    const description = UpdateDescription;

    await this.prismaUsersRepository.checkUsernameExistsForUpdate(
      username,
      userId
    );
    await this.prismaUsersRepository.checkUsername(username);

    const updatedUser = await this.prismaUsersRepository.update(
      userId,
      username,
      description
    );

    return updatedUser;
  }
}
