import { expect, describe, it } from "vitest";
import { InMemoryUsersRepository } from "../../../repositories/in-memory/in-memory-users-repository";
import { CreateUserServices } from "../CreateUser";
import { UpdateUserServices } from "../UpdateUser";
import { UsernameAlreadyExists } from "../errors/username-already-exists";

describe("Update user services (Unit)", () => {
  it("should not be able to update a user username exist", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const createUserServices = new CreateUserServices(inMemoryUsersRepository);
    const updateUserServices = new UpdateUserServices(inMemoryUsersRepository);

    const userId = "user2";
    const username = "JhonDoe";
    const description = "";

    await createUserServices.execute({
      username: "JhonDoe",
      email: "jhondoe@gmail.com",
      passwordhash: "Senha@123",
    });

    expect(() =>
      updateUserServices.execute({ userId, username, description })
    ).rejects.toBeInstanceOf(UsernameAlreadyExists);
  });

  it("should be able to update a user", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const createUserServices = new CreateUserServices(inMemoryUsersRepository);
    const updateUserServices = new UpdateUserServices(inMemoryUsersRepository);

    await createUserServices.execute({
      username: "JhonDoe",
      email: "jhondoe01@gmail.com",
      passwordhash: "Senha@123",
    });

    const updatedUser = await updateUserServices.execute({
      userId: "user1",
      username: "JhonDoe2",
      description: "",
    });

    expect(updatedUser.username).toBe("JhonDoe2");
  });
});
