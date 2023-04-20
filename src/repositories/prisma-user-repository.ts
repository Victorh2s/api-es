import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export class PrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async delete(userId: string) {
    await prisma.user.delete({ where: { id: userId } });
    return "User deleted";
  }

  async getById(userId: string) {
    const findUser = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        tasks: true,
      },
    });

    if (!findUser) {
      throw new Error("User not found");
    }

    return findUser;
  }

  async getByEmail(email: string) {
    const emailAlexist = await prisma.user.findUnique({
      where: { email },
    });

    return emailAlexist;
  }

  async getByUsername(username: string, userId: string) {
    const usernameAlexist = await prisma.user.findUnique({
      where: { username },
    });

    if (usernameAlexist) {
      throw new Error("Username already exists");
    }
    return usernameAlexist;
  }

  async update(userId: string, username: string, description: string) {
    const updateUser = await prisma.user.update({
      where: { id: userId },
      data: { username, description },
    });

    return updateUser;
  }

  async checkEmailExists(email: string, userId?: string) {
    const emailAlexist = await prisma.user.findUnique({
      where: { email },
    });

    if (!userId) {
      if (emailAlexist) {
        throw new Error("Email already exists");
      }
    }

    if (emailAlexist?.id !== userId) {
      throw new Error("Email already exists");
    }
  }

  async checkUsernameExistsForCreation(username: string) {
    const usernameAlexist = await prisma.user.findUnique({
      where: { username },
    });

    if (usernameAlexist) {
      throw new Error("Username already exists");
    }
  }

  async checkUsernameExistsForUpdate(username: string, userId: string) {
    const usernameAlexist = await prisma.user.findUnique({
      where: { username },
    });

    if (usernameAlexist && usernameAlexist.id !== userId) {
      throw new Error("Username already exists");
    }
  }
}
