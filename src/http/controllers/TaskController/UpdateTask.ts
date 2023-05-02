import { Request, Response } from "express";
import { UpdateTaskServices } from "../../../services/TaskServices/UpdateTask";
import { PrismaTaskRepository } from "../../../repositories/prisma/prisma-task-repository";
import { TaskNotFound } from "../../../services/TaskServices/errors/task-not-found";
import { NotAuthorized } from "../../../services/TaskServices/errors/not-authorized";

export async function UpdateTask(request: Request, response: Response) {
  const { id } = request.params;
  const { title, description, status, finishedat } = request.body;
  const { userId } = request;
  try {
    const prismaTaskRepository = new PrismaTaskRepository();
    const updateTaskServices = new UpdateTaskServices(prismaTaskRepository);

    const updateTask = await updateTaskServices.execute({
      id,
      userId,
      title,
      description,
      status,
      finishedat,
    });

    return response.status(200).json(updateTask);
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
