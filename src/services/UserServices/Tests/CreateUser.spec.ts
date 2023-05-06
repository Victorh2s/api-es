import { expect, describe, it } from "vitest";
import { CreateUserServices } from "../CreateUser";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "../../../repositories/in-memory/in-memory-users-repository";
import { EmailAlreadyExistsError } from "../errors/email-already-exists";
import { UsernameAlreadyExists } from "../errors/username-already-exists";
import { InvalidUsernameRegx } from "../errors/invalid-username-regx";
import { InvalidPasswordRegx } from "../errors/invalid-password-regx";

describe("Create user services (Unit)", () => {
  it("should hash user password upon creation", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();

    const createUserServices = new CreateUserServices(inMemoryUsersRepository);

    const { user } = await createUserServices.execute({
      username: "JhonDoe",
      email: "jhondoe@gmail.com",
      passwordhash: "Senha@123",
    });

    const isPasswordCorrectlyHashed = await compare(
      "Senha@123",
      (
        await user
      ).password
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to create a user with same email twice", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const createUserServices = new CreateUserServices(inMemoryUsersRepository);
    const email = "jhondoe@gmail.com";

    await createUserServices.execute({
      username: "JhonDoe",
      email,
      passwordhash: "Senha@123",
    });

    expect(() =>
      createUserServices.execute({
        username: "JhonDoe",
        email,
        passwordhash: "Senha@123",
      })
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError);
  });

  it("should not be able to create a user with same username twice", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const createUserServices = new CreateUserServices(inMemoryUsersRepository);

    const username = "JhonDoe";

    await createUserServices.execute({
      username,
      email: "jhondoe01@gmail.com",
      passwordhash: "Senha@123",
    });

    expect(
      async () =>
        await createUserServices.execute({
          username,
          email: "jhondoe02@gmail.com",
          passwordhash: "Senha@123",
        })
    ).rejects.toBeInstanceOf(UsernameAlreadyExists);
  });

  it("should not create a user if the username does not comply with the imposed rules", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const createUserServices = new CreateUserServices(inMemoryUsersRepository);

    const username = "JhonD   ~´oe";
    expect(
      async () =>
        await createUserServices.execute({
          username,
          email: "jhondoe02@gmail.com",
          passwordhash: "Senha@123",
        })
    ).rejects.toBeInstanceOf(InvalidUsernameRegx);
  });

  it("should not create a user if the password does not comply with the imposed rules", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const createUserServices = new CreateUserServices(inMemoryUsersRepository);

    const username = "JhonDoe";
    expect(
      async () =>
        await createUserServices.execute({
          username,
          email: "jhondoe02@gmail.com",
          passwordhash: "senha123",
        })
    ).rejects.toBeInstanceOf(InvalidPasswordRegx);
  });
});
