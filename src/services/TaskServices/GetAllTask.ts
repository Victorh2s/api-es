import { IntPrismaTaskRepository } from "../../repositories/interfaces/int-prisma-task-repository";
import { PrismaTaskRepository } from "../../repositories/prisma-task-repository";

export class GetAllTaskServices {
  constructor(private prismaTaskRepository: IntPrismaTaskRepository) {}

  async execute(userId: string) {
    const prismaTaskRepository = new PrismaTaskRepository();

    const allTask = await prismaTaskRepository.getAllTasks(userId);

    return allTask;
  }
}
