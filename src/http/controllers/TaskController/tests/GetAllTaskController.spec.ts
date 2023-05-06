import request from "supertest";
import { app } from "../../../../app";
import { describe, expect, it } from "vitest";
import { createAuthenticateUser } from "../../../../utils/tests/create-authenticate-user";

describe("Get All Tasks (E2E)", () => {
  it("should get all tasks", async () => {
    setTimeout(async () => {
      const { token } = await createAuthenticateUser(app);

      await request(app)
        .post("/task")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "task criada para o teste",
          description: "descrição criada",
          status: "Pendente",
        });

      const getAllTasks = await request(app)
        .get(`/task`)
        .set("Authorization", `Bearer ${token}`);

      expect(getAllTasks.statusCode).toEqual(200);
    }, 1000);
  });
});
