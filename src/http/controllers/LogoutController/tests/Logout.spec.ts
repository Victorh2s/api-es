import request from "supertest";
import { app } from "../../../../app";
import { describe, expect, it } from "vitest";
import { createAuthenticateUser } from "../../../../utils/tests/create-authenticate-user";

describe("Create Token (E2E)", () => {
  it("should create a token", async () => {
    setTimeout(async () => {
      const { token } = await createAuthenticateUser(app);

      const userCreated = await request(app)
        .post("/logout")
        .set("Authorization", `Bearer ${token}`);

      expect(userCreated.statusCode).toEqual(200);
    }, 1000);
  });
});
