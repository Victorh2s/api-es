import { IntPrismaRefreshTokenRepository } from "../../repositories/prisma/interfaces/int-prisma-refreshToken-repository";

export class DeleteRefreshTokenServices {
  constructor(
    private prismaRefreshTokenRepository: IntPrismaRefreshTokenRepository
  ) {}

  async execute(authorId: string) {
    this.prismaRefreshTokenRepository.deleteMany(authorId);

    return "Refresh Token deleted";
  }
}
