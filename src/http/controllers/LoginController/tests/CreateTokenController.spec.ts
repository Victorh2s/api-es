import jwt from "jsonwebtoken";
import { app } from "../../../../app";
import { describe, expect, it } from "vitest";
import { createAuthenticateUser } from "../../../../utils/tests/create-authenticate-user";

describe("Create Token (E2E)", () => {
  it("should create a token", async () => {
    setTimeout(async () => {
      const { token } = await createAuthenticateUser(app);
      const decoded = jwt.decode(token, { complete: true });

      expect(decoded?.header.typ).toEqual("JWT");
    }, 1000);
  });
});
