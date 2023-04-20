import { IntPrismaTaskRepository } from "../../repositories/interfaces/int-prisma-task-repository";

export class DeleteTaskServices {
  constructor(private prismaTaskRepository: IntPrismaTaskRepository) {}

  async execute(userId: string, id: string) {
    const taskDeleted = await this.prismaTaskRepository.delete(userId, id);

    return taskDeleted;
  }
}
