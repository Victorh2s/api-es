import { Request, Response } from "express";
import { GetUniqueTaskServices } from "../../../services/TaskServices/GetUniqueTask";
import { PrismaTaskRepository } from "../../../repositories/prisma-task-repository";

export async function GetUniqueTask(request: Request, response: Response) {
  const { id } = request.params;
  const { userId } = request;
  try {
    const prismaTaskRepository = new PrismaTaskRepository();
    const getUniqueTaskService = new GetUniqueTaskServices(
      prismaTaskRepository
    );

    const allTaskFound = await getUniqueTaskService.execute(userId, id);
    return response.status(200).json(allTaskFound);
  } catch (err: any) {
    return response.status(400).json({
      message: err.message,
    });
  }
}
