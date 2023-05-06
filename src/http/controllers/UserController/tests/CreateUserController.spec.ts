import { app } from "../../../../app";
import request from "supertest";
import { describe, expect, it } from "vitest";

describe("Create User (E2E)", () => {
  it("should create a user", async () => {
    setTimeout(async () => {
      const userCreated = await request(app).post("/user").send({
        username: "Jhon005",
        email: "jhon005@example.com",
        password: "Jhon@123456",
      });

      expect(userCreated.statusCode).toEqual(201);
    }, 1000);
  });
});
