import { expect, describe, it } from "vitest";
import { InMemoryUsersRepository } from "../../../repositories/in-memory/in-memory-users-repository";
import { CreateUserServices } from "../CreateUser";
import { UpdateUserServices } from "../UpdateUser";
import { UsernameAlreadyExists } from "../errors/username-already-exists";
import { InvalidUsernameRegx } from "../errors/invalid-username-regx";

describe("Update user services (Unit)", () => {
  it("should not be able to update a user username exist", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const createUserServices = new CreateUserServices(inMemoryUsersRepository);
    const updateUserServices = new UpdateUserServices(inMemoryUsersRepository);

    const userId = "user2";
    const UpdateUsername = "JhonDoe";
    const UpdateDescription = "";

    await createUserServices.execute({
      username: "JhonDoe",
      email: "jhondoe@gmail.com",
      passwordhash: "Senha@123",
    });

    expect(() =>
      updateUserServices.execute({ userId, UpdateUsername, UpdateDescription })
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
      UpdateUsername: "JhonDoe2",
      UpdateDescription: "",
    });

    expect(updatedUser.username).toBe("JhonDoe2");
  });

  it("should not update user if username fails RegEx test", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const createUserServices = new CreateUserServices(inMemoryUsersRepository);
    const updateUserServices = new UpdateUserServices(inMemoryUsersRepository);

    await createUserServices.execute({
      username: "JhonDoe",
      email: "jhondoe01@gmail.com",
      passwordhash: "Senha@123",
    });

    expect(async () => {
      await updateUserServices.execute({
        userId: "user1",
        UpdateUsername: "Jhon  Doe2",
        UpdateDescription: "",
      });
    }).rejects.toBeInstanceOf(InvalidUsernameRegx);
  });
});
