import { Request, Response } from "express";
import { DeleteUserServices } from "../../../services/UserServices/DeleteUser";
import { PrismaUsersRepository } from "../../../repositories/prisma-user-repository";

export async function DeleteUser(request: Request, response: Response) {
  const { userId } = request;

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const deleteUserServices = new DeleteUserServices(prismaUsersRepository);

    const userDeleted = await deleteUserServices.execute(userId);
    return response.status(200).json(userDeleted);
  } catch (err: any) {
    return response.status(400).json({
      message: err.message,
    });
  }
}
