import request from "supertest";
import { app } from "../../../../app";
import { describe, expect, it } from "vitest";

describe("Get User (E2E)", () => {
  it("should get a user", async () => {
    const authResponse = await request(app).post("/login").send({
      email: "jhon002@example.com",
      password: "Jhon@123456",
    });

    const { token } = authResponse.body;

    const profileResponse = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${token}`);

    expect(profileResponse.statusCode).toEqual(200);
  });
});
