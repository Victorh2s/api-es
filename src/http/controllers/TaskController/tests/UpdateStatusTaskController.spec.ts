import request from "supertest";
import { app } from "../../../../app";
import { describe, expect, it } from "vitest";
import { createAuthenticateUser } from "../../../../utils/tests/create-authenticate-user";

describe("Update status task (E2E)", () => {
  it("should update status task", async () => {
    const { token } = await createAuthenticateUser(app);

    const taskResponse = await request(app)
      .post("/task")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "task criada para o teste",
        description: "descrição criada",
        status: "Pendente",
      });

    const id = taskResponse.body.id;

    const updateStatusTask = await request(app)
      .patch(`/task/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        status: "Pendente",
      });

    expect(updateStatusTask.statusCode).toEqual(200);
  }, 10000);
});
