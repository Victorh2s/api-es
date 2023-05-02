import { expect, describe, it } from "vitest";
import { InMemoryTaskRepository } from "../../../repositories/in-memory/in-memory-task";
import { DeleteTaskServices } from "../DeleteTask";
import { NotAuthorized } from "../errors/not-authorized";
import { CreateTaskServices } from "../CreateTask";
import { TaskNotFound } from "../errors/task-not-found";

describe("Delete task services (Unit)", () => {
  it("should delete a task", async () => {
    const taskRepository = new InMemoryTaskRepository();
    const createTaskServices = new CreateTaskServices(taskRepository);
    const deleteTaskServices = new DeleteTaskServices(taskRepository);

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

    const taskDeleted = await deleteTaskServices.execute({
      id: task.id,
      userId: task.userId,
    });

    expect(taskDeleted).toBe("User deleted");
  });
  it("should not delete a task if authorId is different from userId", async () => {
    const taskRepository = new InMemoryTaskRepository();
    const deleteTaskServices = new DeleteTaskServices(taskRepository);
    const createTaskServices = new CreateTaskServices(taskRepository);

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
      await deleteTaskServices.execute({ id: task.id, userId: task.userId });
    }).rejects.toBeInstanceOf(NotAuthorized);
  });
  it("should not delete a task if id not found", async () => {
    const taskRepository = new InMemoryTaskRepository();
    const deleteTaskServices = new DeleteTaskServices(taskRepository);
    const createTaskServices = new CreateTaskServices(taskRepository);

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
      await deleteTaskServices.execute({ id: task.id, userId: task.userId });
    }).rejects.toBeInstanceOf(TaskNotFound);
  });
});
