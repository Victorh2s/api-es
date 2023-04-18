import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { format } from "date-fns";
const prisma = new PrismaClient();

export async function UpdateFinishatTask(request: Request, response: Response) {
  try {
    const { id } = request.params;
    const { userId } = request;
    const { finishedat } = request.body;

    const findTask = await prisma.task.findUnique({ where: { id } });

    if (!findTask) {
      throw new Error("Task not found");
    }

    if (findTask.authorId !== userId) {
      throw new Error("You are not allowed");
    }

    const formatDate = format(new Date(finishedat), "dd/MM/yyyy");

    const updateStatusTask = await prisma.task.update({
      where: {
        id,
      },
      data: {
        finished_at: formatDate,
      },
    });

    return response.status(200).json(updateStatusTask);
  } catch (err: any) {
    return response.status(400).json({
      message: err.message,
    });
  }
}
