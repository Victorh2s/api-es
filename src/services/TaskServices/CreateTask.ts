import { format } from "date-fns";
import { ToolBox } from "../../utils/toolBox";
import { PrismaTaskRepository } from "../../repositories/prisma-task-repository";

export async function CreateTaskServices(
  userId: string,
  title: string,
  description: string,
  stt: string
) {
  const createdat = format(new Date(), "dd/MM/yyyy");

  const allTools = new ToolBox();
  const status = allTools.checkStatus(stt);

  const prismaTaskRepository = new PrismaTaskRepository();

  const createTask = await prismaTaskRepository.create({
    title,
    description,
    status,
    userId,
    createdat,
  });

  return createTask;
}
