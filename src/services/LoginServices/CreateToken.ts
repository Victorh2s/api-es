import { compare } from "bcryptjs";
import { IntPrismaUserRepository } from "../../repositories/prisma/interfaces/int-prisma-user-repository";
import { UserNotFound } from "../UserServices/errors/user-not-found";
import { PasswordIncorrect } from "./errors/password-incorrect";
import { InvalidCredentials } from "./errors/invalid-credentials";
import { IntPrismaRefreshTokenRepository } from "../../repositories/prisma/interfaces/int-prisma-refreshToken-repository";
import { GenerateTokenProvider } from "../../http/provider/GenerateTokenProvider";

export class CreateTokenServices {
  constructor(
    private prismaUsersRepository: IntPrismaUserRepository,
    private prismaRefreshTokenRepository: IntPrismaRefreshTokenRepository
  ) {}

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

    const generateTokenProvider = new GenerateTokenProvider();
    const token = generateTokenProvider.execute(id);

    this.prismaRefreshTokenRepository.deleteMany(id);
    const refreshToken = await this.prismaRefreshTokenRepository.create(id);

    return {
      refreshToken,
      token,
      user: { name: findUser.username, id, email },
    };
  }
}
