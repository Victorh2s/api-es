import { IntPrismaTaskRepository } from "../../repositories/prisma/interfaces/int-prisma-task-repository";

export interface IntUpdateStatusTaskServices {
  userId: string;
  id: string;
  status: string;
}

export class UpdateStatusTaskServices {
  constructor(private prismaTaskRepository: IntPrismaTaskRepository) {}

  async execute({ userId, id, status: stt }: IntUpdateStatusTaskServices) {
    await this.prismaTaskRepository.checkAuthorizedAndTask(userId, id);

    const taskUpdated = await this.prismaTaskRepository.updateStatusTask(
      id,
      stt
    );

    return taskUpdated;
  }
}
