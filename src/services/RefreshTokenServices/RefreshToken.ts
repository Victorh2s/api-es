import { GenerateTokenProvider } from "../../http/provider/GenerateTokenProvider";
import { IntPrismaRefreshTokenRepository } from "../../repositories/prisma/interfaces/int-prisma-refreshToken-repository";
import dayjs from "dayjs";

export class RefreshTokenServices {
  constructor(
    private prismaRefreshTokenRepository: IntPrismaRefreshTokenRepository
  ) {}

  async execute(refreshTokenId: string) {
    const refreshToken = await this.prismaRefreshTokenRepository.findById(
      refreshTokenId
    );

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn)
    );

    const generateTokenProvider = new GenerateTokenProvider();

    const token = generateTokenProvider.execute(refreshToken.authorId);

    if (refreshTokenExpired) {
      this.prismaRefreshTokenRepository.deleteMany(refreshToken.authorId);

      const newRefreshToken = await this.prismaRefreshTokenRepository.create(
        refreshToken.authorId
      );

      return { token, refreshToken: newRefreshToken };
    }

    return { token };
  }
}
