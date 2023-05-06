import { expect, describe, it } from "vitest";
import { InMemoryRefreshTokenRepository } from "../../../repositories/in-memory/in-memory-refreshToken-repository";
import { RefreshTokenServices } from "../RefreshToken";
import { InvalidRefreshToken } from "../errors/invalid-refresh-token";

describe("Create refresh token services (Unit)", () => {
  it("should not create a refresh token if id is not found in sistem", async () => {
    const inMemoryRefreshTokenRepository = new InMemoryRefreshTokenRepository();

    const refreshTokenServices = new RefreshTokenServices(
      inMemoryRefreshTokenRepository
    );

    expect(async () => {
      await refreshTokenServices.execute("6455d28a187803049ac788de");
    }).rejects.toBeInstanceOf(InvalidRefreshToken);
  });
});
