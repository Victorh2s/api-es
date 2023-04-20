import { Prisma, Task, User } from "@prisma/client";

export interface IntPrismaUserRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;

  delete(userId: string): Promise<String>;

  getById(userId: string): Promise<
    User & {
      tasks: Task[];
    }
  >;

  getByEmail(email: string): Promise<User | null>;

  getByUsername(username: string, userId: string): Promise<null>;

  update(userId: string, username: string, description: string): Promise<User>;

  checkEmailExists(email: string, userId?: string): Promise<void>;

  checkUsernameExistsForCreation(username: string): Promise<void>;

  checkUsernameExistsForUpdate(username: string, userId: string): Promise<void>;
}
