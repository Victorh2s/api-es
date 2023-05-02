import { Request, Response } from "express";
import { z } from "zod";
import { CreateUserServices } from "../../../services/UserServices/CreateUser";
import { ToolBox } from "../../../utils/toolBox";
import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-user-repository";
import { EmailAlreadyExistsError } from "../../../services/UserServices/errors/email-already-exists";
import { UsernameAlreadyExists } from "../../../services/UserServices/errors/username-already-exists";

export async function CreateUser(request: Request, response: Response) {
  const allTools = new ToolBox();
  const usernameValidation = allTools.regexUsername();
  const passwordValidation = allTools.regexPassword();

  const CreateUserSchema = z.object({
    username: z.string().min(3).regex(usernameValidation),
    email: z.string().email(),
    password: z.string().min(6).regex(passwordValidation),
  });

  const {
    username,
    email,
    password: passwordhash,
  } = CreateUserSchema.parse(request.body);

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
    throw err;
  }
}
