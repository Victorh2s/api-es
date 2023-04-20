import { Request, Response } from "express";
import { CreateTaskServices } from "../../../services/TaskServices/CreateTask";
import { PrismaTaskRepository } from "../../../repositories/prisma-task-repository";

export async function CreateTask(request: Request, response: Response) {
  const { userId } = request;
  const { title, description, status: stt } = request.body;
  try {
    const prismaTaskRepository = new PrismaTaskRepository();
    const createTaskServices = new CreateTaskServices(prismaTaskRepository);

    const createdTask = await createTaskServices.execute(
      userId,
      title,
      description,
      stt
    );

    return response.status(200).json(createdTask);
  } catch (err: any) {
    return response.status(400).json({
      message: err.message,
    });
  }
}
