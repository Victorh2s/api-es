import { PrismaClient } from "@prisma/client";
import { format } from "date-fns";
import { ToolBox } from "../utils/toolBox";

const prisma = new PrismaClient();

interface CreateTaskInt {
  title: string;
  description: string;
  status: string;
  userId: string;
  createdat: string;
}

export class PrismaTaskRepository {
  async create({
    title,
    description,
    userId,
    status,
    createdat,
  }: CreateTaskInt) {
    const createdTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        authorId: userId,
        created_at: createdat,
      },
    });
    return createdTask;
  }

  async delete(userId: string, id: string) {
    const findTask = await prisma.task.findUnique({ where: { id } });

    if (!findTask) {
      throw new Error("Task not found");
    }

    if (findTask.authorId !== userId) {
      throw new Error("You are not allowed");
    }

    await prisma.task.delete({ where: { id } });

    return "User deleted with success";
  }

  async getAllTasks(userId: string) {
    const findTask = await prisma.task.findMany({
      where: { authorId: userId },
    });

    return findTask;
  }

  async getUniqueTask(userId: string, id: string) {
    const findTask = await prisma.task.findUnique({ where: { id } });

    if (!findTask) {
      throw new Error("Task not found");
    }

    if (findTask.authorId !== userId) {
      throw new Error("You are not allowed");
    }

    return findTask;
  }

  async checkTaskById(userId: string, id: string) {
    const findTask = await prisma.task.findUnique({ where: { id } });

    if (!findTask) {
      throw new Error("Task not found");
    }

    if (findTask.authorId !== userId) {
      throw new Error("You are not allowed");
    }
  }

  async updateStatusTask(id: string, stt: string) {
    const allTools = new ToolBox();

    const status = allTools.checkStatus(stt);

    const updateStatusTask = await prisma.task.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    return updateStatusTask;
  }

  async updateTask(
    id: string,
    status: string,
    finishedat: string,
    title: string,
    description: string
  ) {
    const formatDate = format(new Date(finishedat), "dd/MM/yyyy");

    const updateTask = await prisma.task.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        status,
        finished_at: formatDate,
      },
    });

    return updateTask;
  }
}
