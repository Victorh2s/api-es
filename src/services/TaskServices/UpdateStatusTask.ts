import { IntPrismaTaskRepository } from "../../repositories/interfaces/int-prisma-task-repository";

export class UpdateStatusTaskServices {
  constructor(private prismaTaskRepository: IntPrismaTaskRepository) {}

  async execute(userId: string, id: string, stt: string) {
    await this.prismaTaskRepository.checkTaskById(userId, id);

    const taskUpdated = await this.prismaTaskRepository.updateStatusTask(
      id,
      stt
    );

    return taskUpdated;
  }
}
