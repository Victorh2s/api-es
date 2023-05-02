import { ToolBox } from "../../utils/toolBox";
import { IntPrismaTaskRepository } from "../../repositories/prisma/interfaces/int-prisma-task-repository";

export interface IntCreateTaskServices {
  userId: string;
  title: string;
  description: string;
  status: string;
}

export class CreateTaskServices {
  constructor(private prismaTaskRepository: IntPrismaTaskRepository) {}

  async execute({
    userId,
    title,
    description,
    status: stt,
  }: IntCreateTaskServices) {
    const allTools = new ToolBox();
    const status = allTools.checkStatus(stt);

    const createTask = await this.prismaTaskRepository.create({
      title,
      description,
      status,
      userId,
    });

    return createTask;
  }
}
