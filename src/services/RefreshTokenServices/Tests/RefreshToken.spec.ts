import { expect, describe, it } from "vitest";
import { InMemoryUsersRepository } from "../../../repositories/in-memory/in-memory-users-repository";
import { CreateUserServices } from "../../UserServices/CreateUser";
import { InMemoryRefreshTokenRepository } from "../../../repositories/in-memory/in-memory-refreshToken-repository";
import { RefreshTokenServices } from "../RefreshToken";
import { CreateTokenServices } from "../../LoginServices/CreateToken";
import { InvalidRefreshToken } from "../errors/invalid-refresh-token";
import dayjs from "dayjs";

describe("Create refresh token services (Unit)", () => {
  it("should create a refresh token", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const inMemoryRefreshTokenRepository = new InMemoryRefreshTokenRepository();

    const createUserServices = new CreateUserServices(inMemoryUsersRepository);

    const createTokenServices = new CreateTokenServices(
      inMemoryUsersRepository,
      inMemoryRefreshTokenRepository
    );

    const refreshTokenServices = new RefreshTokenServices(
      inMemoryRefreshTokenRepository
    );

    const userData = {
      username: "JhonDoe",
      email: "jhondoe@gmail.com",
      passwordhash: "Senha@123",
    };

    await createUserServices.execute({
      username: userData.username,
      email: userData.email,
      passwordhash: userData.passwordhash,
    });

    const token = await createTokenServices.execute(
      userData.email,
      userData.passwordhash
    );

    const refreshToken = await refreshTokenServices.execute(
      token.refreshToken.id
    );

    expect(refreshToken).not.toBeNull();
  });

  it("should create and return a token and a refresh token if the token has expired, if the token is still valid it should return just the token", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const inMemoryRefreshTokenRepository = new InMemoryRefreshTokenRepository();

    const createUserServices = new CreateUserServices(inMemoryUsersRepository);

    const createTokenServices = new CreateTokenServices(
      inMemoryUsersRepository,
      inMemoryRefreshTokenRepository
    );

    const refreshTokenServices = new RefreshTokenServices(
      inMemoryRefreshTokenRepository
    );

    const userData = {
      username: "JhonDoe",
      email: "jhondoe@gmail.com",
      passwordhash: "Senha@123",
    };

    await createUserServices.execute({
      username: userData.username,
      email: userData.email,
      passwordhash: userData.passwordhash,
    });

    const token = await createTokenServices.execute(
      userData.email,
      userData.passwordhash
    );

    const refreshToken = await refreshTokenServices.execute(
      token.refreshToken.id
    );

    if (refreshToken.refreshToken) {
      expect(
        dayjs().isAfter(dayjs.unix(refreshToken.refreshToken.expiresIn))
      ).toBe(true);
      expect(refreshToken.refreshToken).not.toBeNull();
      expect(refreshToken.token).not.toBeNull();
    } else {
      expect(refreshToken.token).not.toBeNull();
    }
  });

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
