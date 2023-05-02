import { Request, Response } from "express";
import { DeleteUserServices } from "../../../services/UserServices/DeleteUser";
import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-user-repository";
import { UserNotFound } from "../../../services/UserServices/errors/user-not-found";

export async function DeleteUser(request: Request, response: Response) {
  const { userId } = request;

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const deleteUserServices = new DeleteUserServices(prismaUsersRepository);

    const userDeleted = await deleteUserServices.execute(userId);
    return response.status(200).json(userDeleted);
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
