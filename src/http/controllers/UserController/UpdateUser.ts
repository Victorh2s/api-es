import { Request, Response } from "express";
import { UpdateUserServices } from "../../../services/UserServices/UpdateUser";
import { PrismaUsersRepository } from "../../../repositories/prisma-user-repository";

export async function UpdateUser(request: Request, response: Response) {
  const { userId } = request;
  const { username, description } = request.body;
  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const updateUserServices = new UpdateUserServices(prismaUsersRepository);

    const getUpdate = await updateUserServices.execute(
      userId,
      username,
      description
    );
    return response.status(200).json(getUpdate);
  } catch (err: any) {
    return response.status(400).json({
      message: err.message,
    });
  }
}
