import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import { IntPrismaUserRepository } from "../../repositories/prisma/interfaces/int-prisma-user-repository";
import { UserNotFound } from "../UserServices/errors/user-not-found";
import { PasswordIncorrect } from "./errors/password-incorrect";
import { InvalidCredentials } from "./errors/invalid-credentials";

export class CreateTokenServices {
  constructor(private prismaUsersRepository: IntPrismaUserRepository) {}

  async execute(email: string, password: string) {
    if (!email || !password) {
      throw new InvalidCredentials();
    }

    const findUser = await this.prismaUsersRepository.getByEmail(email);

    if (!findUser) {
      throw new UserNotFound();
    }

    if (!(await compare(password, findUser.password))) {
      throw new PasswordIncorrect();
    }

    const { id } = findUser;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET as string, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    const refreshToken = jwt.sign(
      { token },
      process.env.REFRESH_TOKEN_SECRET as string,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
      }
    );

    return {
      refreshToken,
      token,
      user: { name: findUser.username, id, email },
    };
  }
}
