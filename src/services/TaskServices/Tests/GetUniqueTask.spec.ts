import { expect, describe, it } from "vitest";
import { InMemoryTaskRepository } from "../../../repositories/in-memory/in-memory-task";
import { CreateTaskServices } from "../CreateTask";
import { GetUniqueTaskServices } from "../GetUniqueTask";
import { NotAuthorized } from "../errors/not-authorized";
import { TaskNotFound } from "../errors/task-not-found";

describe("Get unique task services (Unit)", () => {
  it("should get unique tasks", async () => {
    const taskRepository = new InMemoryTaskRepository();
    const createTaskServices = new CreateTaskServices(taskRepository);
    const getUniqueTaskServices = new GetUniqueTaskServices(taskRepository);

    const task = {
      id: "task01",
      userId: "user1",
      title: "Titulo aleatorio",
      description: "",
      status: "Pendente",
    };

    await createTaskServices.execute({
      userId: task.userId,
      title: task.title,
      description: task.description,
      status: task.status,
    });

    const getTaskOfRepository = await getUniqueTaskServices.execute({
      id: task.id,
      userId: task.userId,
    });

    expect(getTaskOfRepository.id).toBe(task.id);
    expect(getTaskOfRepository.authorId).toBe(task.userId);
    expect(getTaskOfRepository.title).toBe(task.title);
    expect(getTaskOfRepository.description).toBe(task.description);
    expect(getTaskOfRepository.status).toBe(task.status);
  });

  it("should not get a tasks if authorId is different of userId", async () => {
    const taskRepository = new InMemoryTaskRepository();
    const createTaskServices = new CreateTaskServices(taskRepository);
    const getUniqueTaskServices = new GetUniqueTaskServices(taskRepository);

    const task = {
      id: "task01",
      userId: "user2",
      title: "Titulo aleatorio",
      description: "",
      status: "Pendente",
    };

    await createTaskServices.execute({
      userId: "user1",
      title: task.title,
      description: task.description,
      status: task.status,
    });

    expect(async () => {
      await getUniqueTaskServices.execute({
        id: task.id,
        userId: task.userId,
      });
    }).rejects.toBeInstanceOf(NotAuthorized);
  });

  it("should not get a tasks then not exist", async () => {
    const taskRepository = new InMemoryTaskRepository();
    const createTaskServices = new CreateTaskServices(taskRepository);
    const getUniqueTaskServices = new GetUniqueTaskServices(taskRepository);

    const task = {
      id: "task02",
      userId: "user1",
      title: "Titulo aleatorio",
      description: "",
      status: "Pendente",
    };

    await createTaskServices.execute({
      userId: "user1",
      title: task.title,
      description: task.description,
      status: task.status,
    });

    expect(async () => {
      await getUniqueTaskServices.execute({
        id: task.id,
        userId: task.userId,
      });
    }).rejects.toBeInstanceOf(TaskNotFound);
  });
});
