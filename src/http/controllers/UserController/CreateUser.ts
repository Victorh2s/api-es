import { Request, Response } from "express";
import { CreateUserServices } from "../../../services/UserServices/CreateUser";
import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-user-repository";
import { EmailAlreadyExistsError } from "../../../services/UserServices/errors/email-already-exists";
import { UsernameAlreadyExists } from "../../../services/UserServices/errors/username-already-exists";
import { InvalidPasswordRegx } from "../../../services/UserServices/errors/invalid-password-regx";
import { InvalidUsernameRegx } from "../../../services/UserServices/errors/invalid-username-regx";

export async function CreateUser(request: Request, response: Response) {
  const { username, email, password: passwordhash } = request.body;
  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const createUserServices = new CreateUserServices(prismaUsersRepository);
    const UserCreated = await createUserServices.execute({
      email,
      username,
      passwordhash,
    });

    const { user } = UserCreated;

    const {
      id,
      email: emailCreated,
      username: UsernameCreated,
      description,
    } = await user;

    return response
      .status(201)
      .json({ id, emailCreated, UsernameCreated, description });
  } catch (err: any) {
    if (err instanceof EmailAlreadyExistsError) {
      return response.status(409).json({
        message: err.message,
      });
    }

    if (err instanceof UsernameAlreadyExists) {
      return response.status(409).json({
        message: err.message,
      });
    }

    if (err instanceof InvalidPasswordRegx) {
      return response.status(422).json({
        message: err.message,
      });
    }

    if (err instanceof InvalidUsernameRegx) {
      return response.status(422).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      message: err.message,
    });
  }
}
