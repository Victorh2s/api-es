import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import { IntPrismaUserRepository } from "../../repositories/interfaces/int-prisma-user-repository";

export class CreateTokenServices {
  constructor(private prismaUsersRepository: IntPrismaUserRepository) {}

  async execute(email: string, password: string) {
    if (!email || !password) {
      throw new Error("Credencias inválidos");
    }

    const findUser = await this.prismaUsersRepository.getByEmail(email);

    if (!findUser) {
      throw new Error("User not found");
    }

    if (!(await compare(password, findUser.password))) {
      throw new Error("The password is incorrect");
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
