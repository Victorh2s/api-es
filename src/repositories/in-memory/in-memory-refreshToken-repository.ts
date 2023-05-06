import { RefreshToken } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

import { IntPrismaRefreshTokenRepository } from "../prisma/interfaces/int-prisma-refreshToken-repository";
import dayjs from "dayjs";
import { InvalidRefreshToken } from "../../services/RefreshTokenServices/errors/invalid-refresh-token";

export class InMemoryRefreshTokenRepository
  implements IntPrismaRefreshTokenRepository
{
  public items: RefreshToken[] = [];

  async create(userId: string): Promise<RefreshToken> {
    const expiresIn = dayjs().add(15, "second").unix();
    const generateRefreshToken = {
      id: uuidv4(),
      authorId: userId,
      expiresIn,
    };
    this.items.push(generateRefreshToken);

    return generateRefreshToken;
  }

  async findById(id: string): Promise<RefreshToken> {
    const RefreshToken = this.items.find((item) => item.id === id);

    if (!RefreshToken) {
      throw new InvalidRefreshToken();
    }

    return RefreshToken;
  }

  async deleteMany(id: string): Promise<String> {
    const RefreshToken = this.items.filter((item) => item.authorId !== id);

    this.items.push(...RefreshToken);

    return "Refresh token deleted";
  }
}
