import { PrismaTaskRepository } from "../../repositories/prisma-task-repository";

export async function UpdateStatusTaskServices(
  userId: string,
  id: string,
  stt: string
) {
  const prismaTaskRepository = new PrismaTaskRepository();

  await prismaTaskRepository.checkTaskById(userId, id);

  const taskUpdated = await prismaTaskRepository.updateStatusTask(id, stt);

  return taskUpdated;
}
