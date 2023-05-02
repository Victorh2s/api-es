import { Request, Response } from "express";
import { DeleteTaskServices } from "../../../services/TaskServices/DeleteTask";
import { PrismaTaskRepository } from "../../../repositories/prisma/prisma-task-repository";
import { TaskNotFound } from "../../../services/TaskServices/errors/task-not-found";
import { NotAuthorized } from "../../../services/TaskServices/errors/not-authorized";

export async function DeleteTask(request: Request, response: Response) {
  const { userId } = request;
  const { id } = request.params;
  try {
    const prismaTaskRepository = new PrismaTaskRepository();
    const deleteTaskServices = new DeleteTaskServices(prismaTaskRepository);

    const taskDeleted = await deleteTaskServices.execute({ userId, id });

    return response.status(200).json(taskDeleted);
  } catch (err: any) {
    if (err instanceof TaskNotFound) {
      return response.status(404).json({
        message: err.message,
      });
    }

    if (err instanceof NotAuthorized) {
      return response.status(401).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      message: err.message,
    });
  }
}
