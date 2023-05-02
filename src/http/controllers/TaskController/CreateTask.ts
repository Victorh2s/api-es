import { Request, Response } from "express";
import { CreateTaskServices } from "../../../services/TaskServices/CreateTask";
import { PrismaTaskRepository } from "../../../repositories/prisma/prisma-task-repository";
import { UserNotFound } from "../../../services/UserServices/errors/user-not-found";

export async function CreateTask(request: Request, response: Response) {
  const { userId } = request;
  const { title, description, status } = request.body;
  try {
    const prismaTaskRepository = new PrismaTaskRepository();
    const createTaskServices = new CreateTaskServices(prismaTaskRepository);

    const createdTask = await createTaskServices.execute({
      userId,
      title,
      description,
      status,
    });

    return response.status(200).json(createdTask);
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
