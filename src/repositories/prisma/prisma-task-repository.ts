import { PrismaClient } from "@prisma/client";
import { ToolBox } from "../../utils/toolBox";
import { NotAuthorized } from "../../services/TaskServices/errors/not-authorized";
import { TaskNotFound } from "../../services/TaskServices/errors/task-not-found";
import { UserNotFound } from "../../services/UserServices/errors/user-not-found";

const prisma = new PrismaClient();

export interface CreateTaskInt {
  title: string;
  description: string;
  status: string;
  userId: string;
}

export class PrismaTaskRepository {
  async create({ title, description, userId, status }: CreateTaskInt) {
    const findUserById = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        tasks: true,
      },
    });

    if (!findUserById) {
      throw new UserNotFound();
    }

    const createdTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        authorId: userId,
        created_at: new Date(),
      },
    });
    return createdTask;
  }

  async delete(id: string) {
    const findTask = await prisma.task.findUnique({ where: { id } });

    if (!findTask) {
      throw new TaskNotFound();
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

  async getUniqueTask(id: string) {
    const findTask = await prisma.task.findUnique({ where: { id } });

    if (!findTask) {
      throw new TaskNotFound();
    }

    return findTask;
  }

  async checkAuthorizedAndTask(userId: string, id: string) {
    const findTask = await prisma.task.findUnique({ where: { id } });

    if (!findTask) {
      throw new TaskNotFound();
    }

    if (findTask.authorId !== userId) {
      throw new NotAuthorized();
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
    title: string,
    description: string
  ) {
    const updateTask = await prisma.task.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        status,
      },
    });

    return updateTask;
  }
}
