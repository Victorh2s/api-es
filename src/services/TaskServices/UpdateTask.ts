import { PrismaTaskRepository } from "../../repositories/prisma-task-repository";
import { ToolBox } from "../../utils/toolBox";

export async function UpdateTaskServices(
  userId: string,
  id: string,
  stt: string,
  finishedat: string,
  title: string,
  description: string
) {
  const prismaTaskRepository = new PrismaTaskRepository();
  await prismaTaskRepository.checkTaskById(userId, id);

  const allTools = new ToolBox();
  const status = allTools.checkStatus(stt);

  const taskUpdated = await prismaTaskRepository.updateTask(
    id,
    title,
    description,
    status,
    finishedat
  );

  return taskUpdated;
}
