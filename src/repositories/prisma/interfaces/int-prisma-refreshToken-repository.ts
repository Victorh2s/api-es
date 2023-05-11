import { Refreshtoken } from "@prisma/client";

export interface IntPrismaRefreshTokenRepository {
  create(userId: string): Promise<Refreshtoken>;
  findById(id: string): Promise<Refreshtoken>;
  deleteMany(ids: string): Promise<String>;
}
