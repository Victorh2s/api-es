import { expect, describe, it } from "vitest";
import { InMemoryTaskRepository } from "../../../repositories/in-memory/in-memory-task";
import { CreateTaskServices } from "../CreateTask";
import { GetAllTaskServices } from "../GetAllTask";

describe("Get all tasks services (Unit)", () => {
  it("should get all tasks of a unique user", async () => {
    const taskRepository = new InMemoryTaskRepository();
    const createTaskServices = new CreateTaskServices(taskRepository);
    const getAllTaskServices = new GetAllTaskServices(taskRepository);

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

    const getAllTask = await getAllTaskServices.execute({
      userId: task.userId,
    });

    expect(getAllTask[0].id).toBe(task.id);
    expect(getAllTask[0].authorId).toBe(task.userId);
    expect(getAllTask[0].title).toBe(task.title);
    expect(getAllTask[0].description).toBe(task.description);
    expect(getAllTask[0].status).toBe(task.status);
  });
});
