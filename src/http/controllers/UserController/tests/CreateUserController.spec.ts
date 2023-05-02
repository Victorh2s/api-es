import { app } from "../../../../app";
import { describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "../../../../utils/tests/create-and-authenticate-user";

describe("Create User (E2E)", () => {
  it("should create a user", async () => {
    const { user } = await createAndAuthenticateUser(app);
    expect(user.name).toEqual("Jhon006Atualizado");
  });
});
