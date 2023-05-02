import request from "supertest";
import { app } from "../../../../app";
import { describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "../../../../utils/tests/create-and-authenticate-user";

describe("Delete Task (E2E)", () => {
  it("should delete a task", async () => {
    setTimeout(async () => {
      const { token } = await createAndAuthenticateUser(app);

      const taskResponse = await request(app)
        .post("/task")
        .set("Authorization", `Bearer ${token}`);

      const id = taskResponse.body.id;

      const deleteTask = await request(app)
        .delete(`/task/${id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(deleteTask.statusCode).toEqual(200);
    }, 1000);
  });
});
