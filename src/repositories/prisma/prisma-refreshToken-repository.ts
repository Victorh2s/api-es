import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { InvalidRefreshToken } from "../../services/RefreshTokenServices/errors/invalid-refresh-token";

const prisma = new PrismaClient();

export interface CreateTaskInt {
  title: string;
  description: string;
  status: string;
  userId: string;
}

export class PrismaRefreshTokenRepository {
  async create(userId: string) {
    const expiresIn = dayjs().add(7, "days").unix();
    const generateRefreshToken = await prisma.refreshtoken.create({
      data: {
        authorId: userId,
        expiresIn,
      },
    });
    return generateRefreshToken;
  }

  async findById(refreshToken: string) {
    const RefreshToken = await prisma.refreshtoken.findUnique({
      where: {
        id: refreshToken,
      },
    });

    if (!RefreshToken) {
      throw new InvalidRefreshToken();
    }
    return RefreshToken;
  }

  async deleteMany(userId: string) {
    await prisma.refreshtoken.deleteMany({
      where: { authorId: userId },
    });

    return "Refresh token deleted";
  }
}
