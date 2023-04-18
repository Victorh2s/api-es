import { PrismaTaskRepository } from "../../repositories/prisma-task-repository";

export async function DeleteTaskServices(userId: string, id: string) {
  const prismaTaskRepository = new PrismaTaskRepository();

  const taskDeleted = await prismaTaskRepository.delete(userId, id);

  return taskDeleted;
}
