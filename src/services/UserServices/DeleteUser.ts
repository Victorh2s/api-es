import { IntPrismaUserRepository } from "../../repositories/interfaces/int-prisma-user-repository";

export class DeleteUserServices {
  constructor(private prismaUsersRepository: IntPrismaUserRepository) {}
  async execute(userId: string) {
    await this.prismaUsersRepository.getById(userId);

    const userDeleted = await this.prismaUsersRepository.delete(userId);

    return userDeleted;
  }
}
