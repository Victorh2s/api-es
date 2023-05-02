import { IntPrismaUserRepository } from "../../repositories/prisma/interfaces/int-prisma-user-repository";

export class GetUserServices {
  constructor(private prismaUsersRepository: IntPrismaUserRepository) {}

  async execute(userId: string) {
    const findUser = await this.prismaUsersRepository.getById(userId);

    return findUser;
  }
}
