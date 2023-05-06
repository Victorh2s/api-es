import { Request, Response } from "express";
import { CreateTokenServices } from "../../../services/LoginServices/CreateToken";
import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-user-repository";
import { UserNotFound } from "../../../services/UserServices/errors/user-not-found";
import { InvalidCredentials } from "../../../services/LoginServices/errors/invalid-credentials";
import { PasswordIncorrect } from "../../../services/LoginServices/errors/password-incorrect";
import { PrismaRefreshTokenRepository } from "../../../repositories/prisma/prisma-refreshToken-repository";

export async function CreateToken(request: Request, response: Response) {
  const { email, password } = request.body;

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const prismaRefreshTokenRepository = new PrismaRefreshTokenRepository();

    const createTokenServices = new CreateTokenServices(
      prismaUsersRepository,
      prismaRefreshTokenRepository
    );

    const { refreshToken, token, user } = await createTokenServices.execute(
      email,
      password
    );
    return response.status(200).json({
      refreshToken,
      token,
      user,
    });
  } catch (err: any) {
    if (err instanceof UserNotFound) {
      return response.status(404).json({
        message: err.message,
      });
    }

    if (err instanceof InvalidCredentials) {
      return response.status(401).json({
        message: err.message,
      });
    }

    if (err instanceof PasswordIncorrect) {
      return response.status(401).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      message: err.message,
    });
  }
}
