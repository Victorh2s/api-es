import { Request, Response } from "express";
import { PrismaTaskRepository } from "../../../repositories/prisma/prisma-task-repository";
import { GetAllTaskServices } from "../../../services/TaskServices/GetAllTask";

export async function GetAllTask(request: Request, response: Response) {
  const { userId } = request;
  try {
    const prismaTaskRepository = new PrismaTaskRepository();
    const getAllTaskServices = new GetAllTaskServices(prismaTaskRepository);

    const allTaskFound = await getAllTaskServices.execute({ userId });
    return response.status(200).json(allTaskFound);
  } catch (err: any) {
    return response.status(500).json({
      message: err.message,
    });
  }
}
