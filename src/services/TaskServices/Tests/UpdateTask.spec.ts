import { expect, describe, it } from "vitest";
import { InMemoryTaskRepository } from "../../../repositories/in-memory/in-memory-task";
import { CreateTaskServices } from "../CreateTask";
import { InvalidStatus } from "../../../utils/errors/invalid-status";
import { NotAuthorized } from "../errors/not-authorized";
import { TaskNotFound } from "../errors/task-not-found";
import { UpdateTaskServices } from "../UpdateTask";

describe("Update status task services (Unit)", () => {
  it("should update task", async () => {
    const taskRepository = new InMemoryTaskRepository();
    const createTaskServices = new CreateTaskServices(taskRepository);
    const updateTaskServices = new UpdateTaskServices(taskRepository);

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

    const taskUpdateData = {
      title: "título atualizado",
      description: "decrição atualizada",
      status: "Fazendo",
      finishedat: "14/04/2023",
    };

    const getTaskUpdate = await updateTaskServices.execute({
      id: task.id,
      userId: task.userId,
      title: taskUpdateData.title,
      description: taskUpdateData.description,
      status: taskUpdateData.status,
      finishedat: taskUpdateData.finishedat,
    });

    expect(getTaskUpdate.id).toBe(task.id);
    expect(getTaskUpdate.authorId).toBe(task.userId);
    expect(getTaskUpdate.title).toBe(taskUpdateData.title);
    expect(getTaskUpdate.description).toBe(taskUpdateData.description);
    expect(getTaskUpdate.status).toBe(taskUpdateData.status);
  });

  it("should not update status of task if status not equal 'Pendente', 'Fazendo','Feito' ", async () => {
    const taskRepository = new InMemoryTaskRepository();
    const createTaskServices = new CreateTaskServices(taskRepository);
    const updateTaskServices = new UpdateTaskServices(taskRepository);

    const task = {
      id: "task01",
      userId: "user1",
      title: "Titulo aleatorio",
      description: "",
      status: "Pendente",
      finished_at: "14/04/2023",
    };

    await createTaskServices.execute({
      userId: task.userId,
      title: task.title,
      description: task.description,
      status: task.status,
    });

    expect(async () => {
      await updateTaskServices.execute({
        userId: task.userId,
        id: task.id,
        title: task.title,
        description: task.description,
        status: "",
        finishedat: task.finished_at,
      });
    }).rejects.toBeInstanceOf(InvalidStatus);
  });

  it("should not update status of task if authorId not equal userId ", async () => {
    const taskRepository = new InMemoryTaskRepository();
    const createTaskServices = new CreateTaskServices(taskRepository);
    const updateTaskServices = new UpdateTaskServices(taskRepository);

    const task = {
      id: "task01",
      userId: "user1",
      title: "Titulo aleatorio",
      description: "",
      status: "Pendente",
      finished_at: "14/04/2023",
    };

    await createTaskServices.execute({
      userId: task.userId,
      title: task.title,
      description: task.description,
      status: task.status,
    });

    expect(async () => {
      await updateTaskServices.execute({
        userId: "user2",
        id: task.id,
        title: task.title,
        description: task.description,
        status: "Pendente",
        finishedat: task.finished_at,
      });
    }).rejects.toBeInstanceOf(NotAuthorized);
  });

  it("should not update status of task if id is not found ", async () => {
    const taskRepository = new InMemoryTaskRepository();
    const createTaskServices = new CreateTaskServices(taskRepository);
    const updateTaskServices = new UpdateTaskServices(taskRepository);

    const task = {
      id: "task01",
      userId: "user1",
      title: "Titulo aleatorio",
      description: "",
      status: "Pendente",
      finished_at: "14/04/2023",
    };

    await createTaskServices.execute({
      userId: task.userId,
      title: task.title,
      description: task.description,
      status: task.status,
    });

    expect(async () => {
      await updateTaskServices.execute({
        userId: task.userId,
        id: "task02",
        title: task.title,
        status: "Pendente",
        description: task.description,
        finishedat: task.finished_at,
      });
    }).rejects.toBeInstanceOf(TaskNotFound);
  });
});
