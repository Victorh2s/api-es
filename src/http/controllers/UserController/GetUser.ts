import { Request, Response } from "express";
import { GetUserServices } from "../../../services/UserServices/GetUser";
import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-user-repository";
import { UserNotFound } from "../../../services/UserServices/errors/user-not-found";

export async function GetUser(request: Request, response: Response) {
  const { userId } = request;
  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const getUserServices = new GetUserServices(prismaUsersRepository);

    const user = await getUserServices.execute(userId);
    const { id, email, username, description, tasks } = user;
    return response
      .status(200)
      .json({ id, email, username, description, tasks });
  } catch (err: any) {
    if (err instanceof UserNotFound) {
      return response.status(404).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      message: err.message,
    });
  }
}
