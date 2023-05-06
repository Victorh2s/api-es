import request from "supertest";
import { app } from "../../../../app";
import { describe, expect, it } from "vitest";
import { createAuthenticateUser } from "../../../../utils/tests/create-authenticate-user";

describe("Invalid Refresh Token (E2E)", () => {
  it("should invalid refresh token", async () => {
    setTimeout(async () => {
      const { refreshToken } = await createAuthenticateUser(app);
      const newrefreshtoken = await request(app)
        .post("/token/refresh")
        .send({ refreshToken: refreshToken.id });

      expect(newrefreshtoken.statusCode).toEqual(200);
    }, 1000);
  });
});
