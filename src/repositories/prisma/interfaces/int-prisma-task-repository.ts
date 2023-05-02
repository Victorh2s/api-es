import { Task } from "@prisma/client";
import { CreateTaskInt } from "../prisma-task-repository";

export interface IntPrismaTaskRepository {
  create({ title, description, userId, status }: CreateTaskInt): Promise<Task>;

  delete(id: string): Promise<string>;

  getAllTasks(userId: string): Promise<Task[]>;

  getUniqueTask(id: string): Promise<Task>;

  checkAuthorizedAndTask(userId: string, id: string): Promise<void>;

  updateStatusTask(id: string, stt: string): Promise<Task>;

  updateTask(
    id: string,
    status: string,
    title: string,
    description: string
  ): Promise<Task>;
}
