import { Request, Response } from "express";
import { UpdateStatusTaskServices } from "../../../services/TaskServices/UpdateStatusTask";
import { PrismaTaskRepository } from "../../../repositories/prisma/prisma-task-repository";
import { TaskNotFound } from "../../../services/TaskServices/errors/task-not-found";
import { NotAuthorized } from "../../../services/TaskServices/errors/not-authorized";

export async function UpdateStatusTask(request: Request, response: Response) {
  const { id } = request.params;
  const { status } = request.body;
  const { userId } = request;

  try {
    const prismaTaskRepository = new PrismaTaskRepository();
    const updateStatusTaskService = new UpdateStatusTaskServices(
      prismaTaskRepository
    );

    const updatedTask = await updateStatusTaskService.execute({
      userId,
      id,
      status,
    });

    return response.status(200).json(updatedTask);
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
