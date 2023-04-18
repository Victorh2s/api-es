import { PrismaTaskRepository } from "../../repositories/prisma-task-repository";

export async function GetAllTaskServices(userId: string) {
  const prismaTaskRepository = new PrismaTaskRepository();

  const allTask = await prismaTaskRepository.getAllTasks(userId);

  return allTask;
}
