import { RefreshToken } from "@prisma/client";

export interface IntPrismaRefreshTokenRepository {
  create(userId: string): Promise<RefreshToken>;
  findById(id: string): Promise<RefreshToken>;
  deleteMany(ids: string): Promise<String>;
}
