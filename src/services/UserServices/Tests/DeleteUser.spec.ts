import { expect, describe, it } from "vitest";
import { InMemoryUsersRepository } from "../../../repositories/in-memory/in-memory-users-repository";
import { DeleteUserServices } from "../DeleteUser";
import { CreateUserServices } from "../CreateUser";
import { UserNotFound } from "../errors/user-not-found";

describe("Delete user services (Unit)", () => {
  it("Cannot delete a user that does not exist", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();

    const deleteUserServices = new DeleteUserServices(inMemoryUsersRepository);
    const createUserServices = new CreateUserServices(inMemoryUsersRepository);

    const userId = "user2";

    await createUserServices.execute({
      username: "JhonDoe",
      email: "jhondoe@gmail.com",
      passwordhash: "Senha@123",
    });

    expect(async () => {
      await deleteUserServices.execute(userId);
    }).rejects.toBeInstanceOf(UserNotFound);
  });

  it("Can delete an existing user", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();

    const deleteUserServices = new DeleteUserServices(inMemoryUsersRepository);
    const createUserServices = new CreateUserServices(inMemoryUsersRepository);

    const userId = "user1";

    await createUserServices.execute({
      username: "JhonDoe",
      email: "jhondoe@gmail.com",
      passwordhash: "Senha@123",
    });

    const deletedUser = await deleteUserServices.execute(userId);

    expect(deletedUser).toBe("User deleted");
  });
});
