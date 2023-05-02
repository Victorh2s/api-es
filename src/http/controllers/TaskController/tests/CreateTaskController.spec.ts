import request from "supertest";
import { app } from "../../../../app";
import { describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "../../../../utils/tests/create-and-authenticate-user";

describe("Create Task (E2E)", () => {
  it("should create a task", async () => {
    setTimeout(async () => {
      const { token } = await createAndAuthenticateUser(app);

      const taskResponse = await request(app)
        .post("/task")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "task criada para o teste",
          description: "descrição criada",
          status: "Pendente",
        });

      expect(taskResponse.statusCode).toEqual(200);
    }, 1000);
  }, 3000);
});
