import { Request, Response } from "express";
import { UpdateUserServices } from "../../../services/UserServices/UpdateUser";
import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-user-repository";
import { UserNotFound } from "../../../services/UserServices/errors/user-not-found";
import { UsernameAlreadyExists } from "../../../services/UserServices/errors/username-already-exists";

export async function UpdateUser(request: Request, response: Response) {
  const { userId } = request;
  const { username, description } = request.body;
  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const updateUserServices = new UpdateUserServices(prismaUsersRepository);

    const getUpdate = await updateUserServices.execute({
      userId,
      username,
      description,
    });
    return response.status(200).json(getUpdate);
  } catch (err: any) {
    if (err instanceof UserNotFound) {
      return response.status(404).json({
        message: err.message,
      });
    }

    if (err instanceof UsernameAlreadyExists) {
      return response.status(409).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      message: err.message,
    });
  }
}
