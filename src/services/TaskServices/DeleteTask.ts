import { IntPrismaTaskRepository } from "../../repositories/prisma/interfaces/int-prisma-task-repository";

export interface IntDeleteTaskServices {
  userId: string;
  id: string;
}

export class DeleteTaskServices {
  constructor(private prismaTaskRepository: IntPrismaTaskRepository) {}

  async execute({ userId, id }: IntDeleteTaskServices) {
    await this.prismaTaskRepository.checkAuthorizedAndTask(userId, id);

    const taskDeleted = await this.prismaTaskRepository.delete(id);

    return taskDeleted;
  }
}
