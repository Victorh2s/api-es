import jwt from "jsonwebtoken";
import { app } from "../../../../app";
import { describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "../../../../utils/tests/create-and-authenticate-user";

describe("Create Token (E2E)", () => {
  it("should create a token", async () => {
    const { token } = await createAndAuthenticateUser(app);
    const decoded = jwt.decode(token, { complete: true });

    expect(decoded?.header.typ).toEqual("JWT");
  });
});
