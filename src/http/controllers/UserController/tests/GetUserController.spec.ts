import request from "supertest";
import { app } from "../../../../app";
import { describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "../../../../utils/tests/create-and-authenticate-user";

describe("Delete User (E2E)", () => {
  it("should delete a user", async () => {
    setTimeout(async () => {
      const { token } = await createAndAuthenticateUser(app);

      const profileResponse = await request(app)
        .get("/user")
        .set("Authorization", `Bearer ${token}`);

      expect(profileResponse.statusCode).toEqual(200);
    }, 1000);
  });
});
