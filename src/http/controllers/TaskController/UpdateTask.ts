import { Request, Response } from "express";
import { UpdateTaskServices } from "../../../services/TaskServices/UpdateTask";
import { PrismaTaskRepository } from "../../../repositories/prisma-task-repository";

export async function UpdateTask(request: Request, response: Response) {
  const { id } = request.params;
  const { title, description, status: stt, finishedat } = request.body;
  const { userId } = request;
  try {
    const prismaTaskRepository = new PrismaTaskRepository();
    const updateTaskServices = new UpdateTaskServices(prismaTaskRepository);

    const updateTask = await updateTaskServices.execute(
      id,
      userId,
      title,
      description,
      stt,
      finishedat
    );

    return response.status(200).json(updateTask);
  } catch (err: any) {
    return response.status(400).json({
      message: err.message,
    });
  }
}
