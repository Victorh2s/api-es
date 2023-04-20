import { Task } from "@prisma/client";
import { CreateTaskInt } from "../prisma-task-repository";

export interface IntPrismaTaskRepository {
  create({
    title,
    description,
    userId,
    status,
    createdat,
  }: CreateTaskInt): Promise<Task>;

  delete(userId: string, id: string): Promise<string>;

  getAllTasks(userId: string): Promise<Task[]>;

  getUniqueTask(userId: string, id: string): Promise<Task>;

  checkTaskById(userId: string, id: string): Promise<void>;

  updateStatusTask(id: string, stt: string): Promise<Task>;

  updateTask(
    id: string,
    status: string,
    finishedat: string,
    title: string,
    description: string
  ): Promise<Task>;
}
