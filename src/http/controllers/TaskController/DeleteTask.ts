import { Request, Response } from "express";
import { DeleteTaskServices } from "../../../services/TaskServices/DeleteTask";
import { PrismaTaskRepository } from "../../../repositories/prisma-task-repository";

export async function DeleteTask(request: Request, response: Response) {
  const { userId } = request;
  const { id } = request.params;
  try {
    const prismaTaskRepository = new PrismaTaskRepository();
    const deleteTaskServices = new DeleteTaskServices(prismaTaskRepository);

    const taskDeleted = await deleteTaskServices.execute(userId, id);

    return response.status(200).json(taskDeleted);
  } catch (err: any) {
    return response.status(400).json({
      message: err.message,
    });
  }
}
