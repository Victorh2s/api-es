import { IntPrismaTaskRepository } from "../../repositories/prisma/interfaces/int-prisma-task-repository";
import { ToolBox } from "../../utils/toolBox";

export interface IntUpdateTaskServices {
  userId: string;
  id: string;
  title: string;
  description: string;
  status: string;
}

export class UpdateTaskServices {
  constructor(private prismaTaskRepository: IntPrismaTaskRepository) {}

  async execute({
    userId,
    id,
    title,
    description,
    status,
  }: IntUpdateTaskServices) {
    await this.prismaTaskRepository.checkAuthorizedAndTask(userId, id);

    const allTools = new ToolBox();
    const stt = allTools.checkStatus(status);

    const taskUpdated = await this.prismaTaskRepository.updateTask(
      id,
      title,
      description,
      stt
    );

    return taskUpdated;
  }
}
