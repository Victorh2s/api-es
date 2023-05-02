import { IntPrismaUserRepository } from "../../repositories/prisma/interfaces/int-prisma-user-repository";

export class DeleteUserServices {
  constructor(private prismaUsersRepository: IntPrismaUserRepository) {}
  async execute(userId: string) {
    const userDeleted = await this.prismaUsersRepository.delete(userId);

    return userDeleted;
  }
}
