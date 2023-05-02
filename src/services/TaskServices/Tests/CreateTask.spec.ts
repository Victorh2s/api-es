import { expect, describe, it } from "vitest";
import { InMemoryTaskRepository } from "../../../repositories/in-memory/in-memory-task";
import { CreateTaskServices } from "../CreateTask";
import { InvalidStatus } from "../../../utils/errors/invalid-status";
import { UserNotFound } from "../../UserServices/errors/user-not-found";

describe("Create task services (Unit)", () => {
  it("should create a task", async () => {
    const taskRepository = new InMemoryTaskRepository();
    const createTaskServices = new CreateTaskServices(taskRepository);

    const task = {
      userId: "user1",
      title: "Titulo aleatorio",
      description: "",
      status: "Pendente",
    };

    const createdTask = await createTaskServices.execute({
      userId: task.userId,
      title: task.title,
      description: task.description,
      status: task.status,
    });

    expect(createdTask.authorId).to.equal(task.userId);
    expect(createdTask.title).to.equal(task.title);
    expect(createdTask.description).to.equal(task.description);
    expect(createdTask.status).to.equal(task.status);
    expect(createdTask.created_at).to.not.equal(new Date());
  });

  it("should not create a task if the userId is not a user ", async () => {
    const taskRepository = new InMemoryTaskRepository();
    const createTaskServices = new CreateTaskServices(taskRepository);

    const task = {
      userId: "user",
      title: "Titulo aleatorio",
      description: "",
      status: "Pendente",
    };

    expect(async () => {
      await createTaskServices.execute({
        userId: task.userId,
        title: task.title,
        description: task.description,
        status: task.status,
      });
    }).rejects.toBeInstanceOf(UserNotFound);
  });

  it("should not create a task if the status is not equal to 'Pendente', 'Fazendo' or 'Feito'.", async () => {
    const taskRepository = new InMemoryTaskRepository();
    const createTaskServices = new CreateTaskServices(taskRepository);

    const task = {
      userId: "user1",
      title: "Titulo aleatorio",
      description: "",
      status: "Concluido",
    };

    expect(async () => {
      await createTaskServices.execute({
        userId: task.userId,
        title: task.title,
        description: task.description,
        status: task.status,
      });
    }).rejects.toBeInstanceOf(InvalidStatus);
  });
});
