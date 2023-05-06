import { Request, Response } from "express";
import { GetUniqueTaskServices } from "../../../services/TaskServices/GetUniqueTask";
import { PrismaTaskRepository } from "../../../repositories/prisma/prisma-task-repository";
import { TaskNotFound } from "../../../services/TaskServices/errors/task-not-found";
import { NotAuthorized } from "../../../services/TaskServices/errors/not-authorized";

export async function GetUniqueTask(request: Request, response: Response) {
  const { id } = request.params;
  const { userId } = request;
  try {
    const prismaTaskRepository = new PrismaTaskRepository();
    const getUniqueTaskService = new GetUniqueTaskServices(
      prismaTaskRepository
    );

    const allTaskFound = await getUniqueTaskService.execute({ userId, id });
    return response.status(200).json(allTaskFound);
  } catch (err: any) {
    if (err instanceof NotAuthorized) {
      return response.status(401).json({
        message: err.message,
      });
    }

    if (err instanceof TaskNotFound) {
      return response.status(404).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      message: err.message,
    });
  }
}
