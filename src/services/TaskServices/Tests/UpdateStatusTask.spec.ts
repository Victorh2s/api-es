import { expect, describe, it } from "vitest";
import { InMemoryTaskRepository } from "../../../repositories/in-memory/in-memory-task";
import { CreateTaskServices } from "../CreateTask";
import { UpdateStatusTaskServices } from "../UpdateStatusTask";
import { InvalidStatus } from "../../../utils/errors/invalid-status";
import { NotAuthorized } from "../errors/not-authorized";
import { TaskNotFound } from "../errors/task-not-found";

describe("Update status task services (Unit)", () => {
  it("should update status of task", async () => {
    const taskRepository = new InMemoryTaskRepository();
    const createTaskServices = new CreateTaskServices(taskRepository);
    const updateStatusTask = new UpdateStatusTaskServices(taskRepository);

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

    const getTaskUpdate = await updateStatusTask.execute({
      id: task.id,
      userId: task.userId,
      status: "Fazendo",
    });

    expect(getTaskUpdate.status).toBe("Fazendo");
  });

  it("should not update status of task if status not equal 'Pendente', 'Fazendo','Feito' ", async () => {
    const taskRepository = new InMemoryTaskRepository();
    const createTaskServices = new CreateTaskServices(taskRepository);
    const updateStatusTask = new UpdateStatusTaskServices(taskRepository);

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

    expect(async () => {
      await updateStatusTask.execute({
        id: task.id,
        userId: task.userId,
        status: "",
      });
    }).rejects.toBeInstanceOf(InvalidStatus);
  });

  it("should not update status of task if authorId not equal userId ", async () => {
    const taskRepository = new InMemoryTaskRepository();
    const createTaskServices = new CreateTaskServices(taskRepository);
    const updateStatusTask = new UpdateStatusTaskServices(taskRepository);

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

    expect(async () => {
      await updateStatusTask.execute({
        id: task.id,
        userId: "user2",
        status: "Fazendo",
      });
    }).rejects.toBeInstanceOf(NotAuthorized);
  });

  it("should not update status of task if id is not found ", async () => {
    const taskRepository = new InMemoryTaskRepository();
    const createTaskServices = new CreateTaskServices(taskRepository);
    const updateStatusTask = new UpdateStatusTaskServices(taskRepository);

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

    expect(async () => {
      await updateStatusTask.execute({
        id: "task02",
        userId: task.userId,
        status: "Pendente",
      });
    }).rejects.toBeInstanceOf(TaskNotFound);
  });
});
