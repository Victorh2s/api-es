import { Request, Response } from "express";
import { GetUserServices } from "../../../services/UserServices/GetUser";
import { PrismaUsersRepository } from "../../../repositories/prisma-user-repository";

export async function GetUser(request: Request, response: Response) {
  const { userId } = request;
  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const getUserServices = new GetUserServices(prismaUsersRepository);

    const user = await getUserServices.execute(userId);
    return response.status(200).json(user);
  } catch (err: any) {
    return response.status(400).json({
      message: err.message,
    });
  }
}
