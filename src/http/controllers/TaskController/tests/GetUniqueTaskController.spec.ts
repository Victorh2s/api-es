import request from "supertest";
import { app } from "../../../../app";
import { describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "../../../../utils/tests/create-and-authenticate-user";

describe("Get a unique Task (E2E)", () => {
  it("should get a task", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const taskResponse = await request(app)
      .post("/task")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "task criada para o teste",
        description: "descrição criada",
        status: "Pendente",
      });

    const id = taskResponse.body.id;

    const getTask = await request(app)
      .get(`/task/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(getTask.statusCode).toEqual(200);
  });
});
