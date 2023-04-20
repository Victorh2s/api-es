import { format } from "date-fns";
import { ToolBox } from "../../utils/toolBox";
import { IntPrismaTaskRepository } from "../../repositories/interfaces/int-prisma-task-repository";

export class CreateTaskServices {
  constructor(private prismaTaskRepository: IntPrismaTaskRepository) {}

  async execute(
    userId: string,
    title: string,
    description: string,
    stt: string
  ) {
    const createdat = format(new Date(), "dd/MM/yyyy");

    const allTools = new ToolBox();
    const status = allTools.checkStatus(stt);

    const createTask = await this.prismaTaskRepository.create({
      title,
      description,
      status,
      userId,
      createdat,
    });

    return createTask;
  }
}
