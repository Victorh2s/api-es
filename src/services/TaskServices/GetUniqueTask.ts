import { IntPrismaTaskRepository } from "../../repositories/prisma/interfaces/int-prisma-task-repository";

export interface IntGetUniqueTaskServices {
  userId: string;
  id: string;
}

export class GetUniqueTaskServices {
  constructor(private prismaTaskRepository: IntPrismaTaskRepository) {}

  async execute({ userId, id }: IntGetUniqueTaskServices) {
    await this.prismaTaskRepository.checkAuthorizedAndTask(userId, id);

    const task = await this.prismaTaskRepository.getUniqueTask(id);

    return task;
  }
}
