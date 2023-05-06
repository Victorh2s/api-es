import request from "supertest";
import { app } from "../../../../app";
import { describe, expect, it } from "vitest";

describe("Update User (E2E)", () => {
  it("should update a user", async () => {
    const authResponse = await request(app).post("/login").send({
      email: "jhon002@example.com",
      password: "Jhon@123456",
    });

    const { token } = authResponse.body;

    const profileResponse = await request(app)
      .put("/user")
      .set("Authorization", `Bearer ${token}`)
      .send({
        username: "Jhon000updated",
        description: "descrição atualizada",
      });

    expect(profileResponse.statusCode).toEqual(200);
  });
});
