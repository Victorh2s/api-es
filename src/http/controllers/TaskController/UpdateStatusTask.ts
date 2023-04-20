import { Request, Response } from "express";
import { UpdateStatusTaskServices } from "../../../services/TaskServices/UpdateStatusTask";
import { PrismaTaskRepository } from "../../../repositories/prisma-task-repository";

export async function UpdateStatusTask(request: Request, response: Response) {
  const { id } = request.params;
  const { status: stt } = request.body;
  const { userId } = request;

  try {
    const prismaTaskRepository = new PrismaTaskRepository();
    const updateStatusTaskService = new UpdateStatusTaskServices(
      prismaTaskRepository
    );

    const updatedTask = await updateStatusTaskService.execute(userId, id, stt);

    return response.status(200).json(updatedTask);
  } catch (err: any) {
    return response.status(400).json({
      message: err.message,
    });
  }
}
