import { expect, describe, it } from "vitest";
import { InMemoryUsersRepository } from "../../../repositories/in-memory/in-memory-users-repository";
import { CreateTokenServices } from "../CreateToken";
import { CreateUserServices } from "../../UserServices/CreateUser";
import { UserNotFound } from "../../UserServices/errors/user-not-found";
import { PasswordIncorrect } from "../errors/password-incorrect";
import { InMemoryRefreshTokenRepository } from "../../../repositories/in-memory/in-memory-refreshToken-repository";

describe("Create token services (Unit)", () => {
  it("should not create a token if the email does not exist", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const inMemoryRefreshTokenRepository = new InMemoryRefreshTokenRepository();
    const createUserServices = new CreateUserServices(inMemoryUsersRepository);

    const createTokenServices = new CreateTokenServices(
      inMemoryUsersRepository,
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

    expect(async () => {
      await createTokenServices.execute(
        "jhondoe25@gmail.com",
        userData.passwordhash
      );
    }).rejects.toBeInstanceOf(UserNotFound);
  });

  it("should not create a token if the password is incompatible with the one entered by the user", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const inMemoryRefreshTokenRepository = new InMemoryRefreshTokenRepository();

    const createUserServices = new CreateUserServices(inMemoryUsersRepository);

    const createTokenServices = new CreateTokenServices(
      inMemoryUsersRepository,
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
      passwordhash: "Senha@321",
    });

    expect(async () => {
      await createTokenServices.execute(userData.email, userData.passwordhash);
    }).rejects.toBeInstanceOf(PasswordIncorrect);
  });

  it("should create a token ", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const inMemoryRefreshTokenRepository = new InMemoryRefreshTokenRepository();

    const createUserServices = new CreateUserServices(inMemoryUsersRepository);

    const createTokenServices = new CreateTokenServices(
      inMemoryUsersRepository,
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

    expect(token.user.name).toBe(userData.username);
  });
});
