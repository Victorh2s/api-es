import { Request, Response } from "express";
import { RefreshTokenServices } from "../../../services/RefreshTokenServices/RefreshToken";
import { PrismaRefreshTokenRepository } from "../../../repositories/prisma/prisma-refreshToken-repository";
import { InvalidRefreshToken } from "../../../services/RefreshTokenServices/errors/invalid-refresh-token";

export async function RefreshToken(request: Request, response: Response) {
  try {
    const { refreshToken } = request.body;

    const prismaRefreshTokenRepository = new PrismaRefreshTokenRepository();
    const refreshTokenServices = new RefreshTokenServices(
      prismaRefreshTokenRepository
    );

    const token = await refreshTokenServices.execute(refreshToken);

    return response.status(200).json(token);
  } catch (err: any) {
    if (err instanceof InvalidRefreshToken) {
      return response.status(404).json({
        message: err.message,
      });
    }
    return response.status(404).json({
      message: err.message,
    });
  }
}
