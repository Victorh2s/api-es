import { Prisma, User, Task } from "@prisma/client";
import { IntPrismaUserRepository } from "../prisma/interfaces/int-prisma-user-repository";
import { UserNotFound } from "../../services/UserServices/errors/user-not-found";
import { EmailAlreadyExistsError } from "../../services/UserServices/errors/email-already-exists";
import { ToolBox } from "../../utils/toolBox";
import { UsernameAlreadyExists } from "../../services/UserServices/errors/username-already-exists";
import { InvalidUsernameRegx } from "../../services/UserServices/errors/invalid-username-regx";
import { InvalidPasswordRegx } from "../../services/UserServices/errors/invalid-password-regx";

export class InMemoryUsersRepository implements IntPrismaUserRepository {
  public items: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: "user1",
      username: data.username,
      email: data.email,
      password: data.password,
      description: "",
    };
    this.items.push(user);

    return user;
  }

  async delete(userId: string) {
    const findUser = this.items.findIndex((item) => item.id === userId);

    if (findUser > -1) {
      this.items.splice(findUser, 1);
    } else {
      throw new UserNotFound();
    }
    return "User deleted";
  }

  async getById(userId: string) {
    const findUserById = this.items.find((item) => item.id === userId);

    if (!findUserById) {
      throw new UserNotFound();
    }
    const tasks: Task[] = [];
    const user = { ...findUserById, tasks };

    return user;
  }

  async getByEmail(email: string) {
    const findUserByEmail = this.items.find((item) => item.email === email);

    if (!findUserByEmail) {
      throw new UserNotFound();
    }

    return findUserByEmail;
  }

  async getByUsername(username: string) {
    const findUserByUsername = this.items.find(
      (item) => item.username === username
    );

    if (!findUserByUsername) {
      throw new UserNotFound();
    }

    return findUserByUsername;
  }

  async update(userId: string, username: string, description: string) {
    const findUser = this.items.find((item) => item.id === userId);

    if (!findUser) {
      throw new UserNotFound();
    }

    findUser.username = username;
    findUser.description = description;

    return findUser;
  }

  async checkEmailExists(email: string, userId?: string | undefined) {
    const checkEmailExist = this.items.find((item) => item.email === email);

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
    const checkUsernameExist = this.items.find(
      (item) => item.username === username
    );
    if (checkUsernameExist) {
      throw new UsernameAlreadyExists();
    }
  }

  async checkUsernameExistsForUpdate(username: string, userId: string) {
    const checkUsernameExist = this.items.find(
      (item) => item.username === username
    );

    if (checkUsernameExist && checkUsernameExist.id !== userId) {
      throw new UsernameAlreadyExists();
    }
  }

  async checkUsername(username: string) {
    const allTools = new ToolBox();
    const usernameValidation = allTools.regexUsername();
    if (!usernameValidation.test(username)) {
      throw new InvalidUsernameRegx();
    }
  }

  async checkPassword(passwordhash: string) {
    const allTools = new ToolBox();
    const passwordValidation = allTools.regexPassword();
    if (!passwordValidation.test(passwordhash)) {
      throw new InvalidPasswordRegx();
    }
  }
}
