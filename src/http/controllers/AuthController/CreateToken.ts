import { Request, Response } from "express";
import { CreateTokenServices } from "../../../services/AuthServices/CreateToken";
import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-user-repository";
import { UserNotFound } from "../../../services/UserServices/errors/user-not-found";
import { InvalidCredentials } from "../../../services/AuthServices/errors/invalid-credentials";
import { PasswordIncorrect } from "../../../services/AuthServices/errors/password-incorrect";

export async function CreateToken(request: Request, response: Response) {
  const { email, password } = request.body;

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const createTokenServices = new CreateTokenServices(prismaUsersRepository);

    const { refreshToken, token, user } = await createTokenServices.execute(
      email,
      password
    );
    return response
      .status(200)
      .cookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .json({
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
