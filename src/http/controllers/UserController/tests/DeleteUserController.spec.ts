import request from "supertest";
import { app } from "../../../../app";
import { describe, expect, it } from "vitest";

describe("Delete User (E2E)", () => {
  it("should delete a user", async () => {
    const authResponse = await request(app).post("/login").send({
      email: "jhon005@example.com",
      password: "Jhon@123456",
    });

    const { token } = authResponse.body;
    setTimeout(async () => {
      const profileResponse = await request(app)
        .delete("/user")
        .set("Authorization", `Bearer ${token}`);

      expect(profileResponse.statusCode).toEqual(200);
    }, 2000);
  });
});
