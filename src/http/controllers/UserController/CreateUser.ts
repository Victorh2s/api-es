import { Request, Response } from "express";
import { z } from "zod";
import { CreateUserServices } from "../../../services/UserServices/CreateUser";
import { ToolBox } from "../../../utils/toolBox";
import { PrismaUsersRepository } from "../../../repositories/prisma-user-repository";

export async function CreateUser(request: Request, response: Response) {
  const allTools = new ToolBox();
  const passwordValidation = allTools.regexPassword();

  const CreateUserSchema = z.object({
    username: z.string(),
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

    const { userCreated } = UserCreated;

    const {
      id,
      email: emailCreated,
      username: UsernameCreated,
      description,
    } = await userCreated;

    return response
      .status(200)
      .json({ id, emailCreated, UsernameCreated, description });
  } catch (err: any) {
    return response.status(400).json({
      message: err.message,
    });
  }
}
