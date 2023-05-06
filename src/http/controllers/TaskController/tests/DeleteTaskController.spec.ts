import request from "supertest";
import { app } from "../../../../app";
import { describe, expect, it } from "vitest";
import { createAuthenticateUser } from "../../../../utils/tests/create-authenticate-user";

describe("Delete Task (E2E)", () => {
  it("should delete a task", async () => {
    const { token } = await createAuthenticateUser(app);
    setTimeout(async () => {
      const taskResponse = await request(app)
        .post("/task")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "task criada para o teste",
          description: "descrição criada",
          status: "Pendente",
        });

      const id = taskResponse.body.id;

      const deleteTask = await request(app)
        .delete(`/task/${id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(deleteTask.statusCode).toEqual(200);
    }, 1000);
  });
});
