import request from "supertest";
import { app } from "../../../../app";
import { describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "../../../../utils/tests/create-and-authenticate-user";

describe("Update User (E2E)", () => {
  it("should update a user", async () => {
    setTimeout(async () => {
      const { token } = await createAndAuthenticateUser(app);

      const profileResponse = await request(app)
        .put("/user")
        .set("Authorization", `Bearer ${token}`)
        .send({
          username: "Jhon006Atualizado",
          description: "descrição atualizada",
        });

      expect(profileResponse.statusCode).toEqual(200);
    }, 1000);
  });
});
