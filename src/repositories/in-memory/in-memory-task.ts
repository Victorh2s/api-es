import { Task } from "@prisma/client";
import { IntPrismaTaskRepository } from "../prisma/interfaces/int-prisma-task-repository";
import { CreateTaskInt } from "../prisma/prisma-task-repository";
import { TaskNotFound } from "../../services/TaskServices/errors/task-not-found";
import { NotAuthorized } from "../../services/TaskServices/errors/not-authorized";
import { ToolBox } from "../../utils/toolBox";
import { InMemoryUsersRepository } from "./in-memory-users-repository";
import { UserNotFound } from "../../services/UserServices/errors/user-not-found";
import { CreateUserServices } from "../../services/UserServices/CreateUser";

export class InMemoryTaskRepository implements IntPrismaTaskRepository {
  public items: Task[] = [];
  async create({
    title,
    description,
    userId,
    status,
  }: CreateTaskInt): Promise<Task> {
    const task = {
      id: "task01",
      title,
      description,
      status,
      authorId: userId,
      created_at: new Date(),
    };

    const usersRepository = new InMemoryUsersRepository();
    const createUserServices = new CreateUserServices(usersRepository);

    const { user } = await createUserServices.execute({
      username: "JhonDoe",
      email: "jhondoe@gmail.com",
      passwordhash: "Senha@123",
    });

    if ((await user).id !== userId) {
      throw new UserNotFound();
    }

    this.items.push(task);

    return task;
  }

  async delete(id: string): Promise<string> {
    const findTask = this.items.findIndex((item) => item.id === id);

    if (findTask > -1) {
      this.items.splice(findTask, 1);
    } else {
      throw new TaskNotFound();
    }
    return "User deleted";
  }

  async getAllTasks(userId: string): Promise<Task[]> {
    const filterTask = this.items.filter((item) => item.authorId === userId);

    return filterTask;
  }

  async getUniqueTask(id: string): Promise<Task> {
    const findTask = this.items.find((item) => item.id === id);

    if (!findTask) {
      throw new TaskNotFound();
    }

    return findTask;
  }

  async checkAuthorizedAndTask(userId: string, id: string): Promise<void> {
    const findTask = this.items.find((item) => item.id === id);

    if (!findTask) {
      throw new TaskNotFound();
    }

    if (findTask.authorId !== userId) {
      throw new NotAuthorized();
    }
  }

  async updateStatusTask(id: string, stt: string): Promise<Task> {
    const allTools = new ToolBox();

    const status = allTools.checkStatus(stt);

    const updateStatusTask = this.items.find((item) => item.id === id);

    if (!updateStatusTask) {
      throw new TaskNotFound();
    }

    updateStatusTask.status = status;

    return updateStatusTask;
  }

  async updateTask(
    id: string,
    title: string,
    description: string,
    status: string
  ): Promise<Task> {
    const updateTask = this.items.find((item) => item.id === id);

    if (!updateTask) {
      throw new TaskNotFound();
    }

    updateTask.title = title;
    updateTask.description = description;
    updateTask.status = status;

    return updateTask;
  }
}
