import { expect, describe, it } from "vitest";
import { InMemoryUsersRepository } from "../../../repositories/in-memory/in-memory-users-repository";
import { GetUserServices } from "../GetUser";
import { CreateUserServices } from "../CreateUser";
import { UserNotFound } from "../errors/user-not-found";

describe("GetUser services (Unit)", () => {
  it("The user cannot view an account that does not exist", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();

    const getUserServices = new GetUserServices(inMemoryUsersRepository);
    const createUserServices = new CreateUserServices(inMemoryUsersRepository);

    const userId = "user2";

    await createUserServices.execute({
      username: "JhonDoe",
      email: "jhondoe@gmail.com",
      passwordhash: "Senha@123",
    });

    expect(async () => {
      await getUserServices.execute(userId);
    }).rejects.toBeInstanceOf(UserNotFound);
  });

  it("The user can view an account that does exist", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();

    const getUserServices = new GetUserServices(inMemoryUsersRepository);
    const createUserServices = new CreateUserServices(inMemoryUsersRepository);

    const userId = "user1";
    const username = "JhonDoe";

    await createUserServices.execute({
      username,
      email: "jhondoe@gmail.com",
      passwordhash: "Senha@123",
    });

    const user = await getUserServices.execute(userId);

    expect(user?.username).toBe(username);
  });
});
