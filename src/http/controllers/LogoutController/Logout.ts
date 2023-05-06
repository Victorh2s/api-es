import { Request, Response } from "express";
import { PrismaRefreshTokenRepository } from "../../../repositories/prisma/prisma-refreshToken-repository";

import { DeleteRefreshTokenServices } from "../../../services/RefreshTokenServices/DeleteRefreshToken";

export async function Logout(request: Request, response: Response) {
  try {
    const prismaRefreshTokenRepository = new PrismaRefreshTokenRepository();
    const deleteRefreshTokenServices = new DeleteRefreshTokenServices(
      prismaRefreshTokenRepository
    );

    const { userId } = request;

    const result = await deleteRefreshTokenServices.execute(userId);

    return response.status(200).json(result);
  } catch (err: any) {
    return response.status(500).json({
      message: "Erro ao realizar logout.",
    });
  }
}
