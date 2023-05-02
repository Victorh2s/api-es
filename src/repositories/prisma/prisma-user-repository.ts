import { PrismaClient, Prisma } from "@prisma/client";
import { EmailAlreadyExistsError } from "../../services/UserServices/errors/email-already-exists";
import { UsernameAlreadyExists } from "../../services/UserServices/errors/username-already-exists";
import { UserNotFound } from "../../services/UserServices/errors/user-not-found";
const prisma = new PrismaClient();

export class PrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async delete(userId: string) {
    const findUserById = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        tasks: true,
      },
    });

    if (!findUserById) {
      throw new UserNotFound();
    }

    await prisma.user.delete({ where: { id: userId } });
    return "User deleted";
  }

  async getById(userId: string) {
    const findUserById = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        tasks: true,
      },
    });

    if (!findUserById) {
      throw new UserNotFound();
    }

    return findUserById;
  }

  async getByEmail(email: string) {
    const findUserByEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (!findUserByEmail) {
      throw new UserNotFound();
    }

    return findUserByEmail;
  }

  async getByUsername(username: string) {
    const findUserByUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (!findUserByUsername) {
      throw new UserNotFound();
    }

    return findUserByUsername;
  }

  async update(userId: string, username: string, description: string) {
    const findUserById = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        tasks: true,
      },
    });

    if (!findUserById) {
      throw new UserNotFound();
    }

    const updateUser = await prisma.user.update({
      where: { id: userId },
      data: { username, description },
    });

    return updateUser;
  }

  async checkEmailExists(email: string, userId?: string) {
    const checkEmailExist = await prisma.user.findUnique({
      where: { email },
    });

    if (!userId) {
      if (checkEmailExist) {
        throw new EmailAlreadyExistsError();
      }
    }
    if (checkEmailExist) {
      if (checkEmailExist.id !== userId) {
        throw new EmailAlreadyExistsError();
      }
    }
  }

  async checkUsernameExistsForCreation(username: string) {
    const checkUsernameExist = await prisma.user.findUnique({
      where: { username },
    });

    if (checkUsernameExist) {
      throw new UsernameAlreadyExists();
    }
  }

  async checkUsernameExistsForUpdate(username: string, userId: string) {
    const checkUsernameExist = await prisma.user.findUnique({
      where: { username },
    });

    if (checkUsernameExist && checkUsernameExist.id !== userId) {
      throw new UsernameAlreadyExists();
    }
  }
}
