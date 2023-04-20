import { IntPrismaTaskRepository } from "../../repositories/interfaces/int-prisma-task-repository";
import { ToolBox } from "../../utils/toolBox";

export class UpdateTaskServices {
  constructor(private prismaTaskRepository: IntPrismaTaskRepository) {}

  async execute(
    userId: string,
    id: string,
    stt: string,
    finishedat: string,
    title: string,
    description: string
  ) {
    await this.prismaTaskRepository.checkTaskById(userId, id);

    const allTools = new ToolBox();
    const status = allTools.checkStatus(stt);

    const taskUpdated = await this.prismaTaskRepository.updateTask(
      id,
      title,
      description,
      status,
      finishedat
    );

    return taskUpdated;
  }
}
