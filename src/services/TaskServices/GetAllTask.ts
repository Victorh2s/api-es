import { IntPrismaTaskRepository } from "../../repositories/prisma/interfaces/int-prisma-task-repository";

export interface IntGetAllTaskServices {
  userId: string;
}

export class GetAllTaskServices {
  constructor(private prismaTaskRepository: IntPrismaTaskRepository) {}

  async execute({ userId }: IntGetAllTaskServices) {
    const allTask = await this.prismaTaskRepository.getAllTasks(userId);

    return allTask;
  }
}
