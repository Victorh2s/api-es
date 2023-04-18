import { PrismaTaskRepository } from "../../repositories/prisma-task-repository";

export async function GetUniqueTaskServices(userId: string, id: string) {
  const prismaTaskRepository = new PrismaTaskRepository();

  const task = await prismaTaskRepository.getUniqueTask(userId, id);

  return task;
}
