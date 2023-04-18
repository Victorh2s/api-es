import { PrismaUsersRepository } from "../../repositories/prisma-user-repository";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";

export async function CreateTokenServices(email: string, password: string) {
  if (!email || !password) {
    throw new Error("Credencias inválidos");
  }

  const prismaUsersRepository = new PrismaUsersRepository();

  const findUser = await prismaUsersRepository.getByEmail(email);

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

  return { refreshToken, token, user: { name: findUser.username, id, email } };
}
