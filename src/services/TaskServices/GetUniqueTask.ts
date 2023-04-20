import { IntPrismaTaskRepository } from "../../repositories/interfaces/int-prisma-task-repository";

export class GetUniqueTaskServices {
  constructor(private prismaTaskRepository: IntPrismaTaskRepository) {}

  async execute(userId: string, id: string) {
    const task = await this.prismaTaskRepository.getUniqueTask(userId, id);

    return task;
  }
}
