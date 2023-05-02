import { Express } from "express";
import request from "supertest";

export async function createAndAuthenticateUser(app: Express) {
  const userCreated = await request(app).post("/user").send({
    username: "Jhon03Create",
    email: "jhon03@example.com",
    password: "Jhon@123456",
  });

  const authResponse = await request(app).post("/authenticate").send({
    email: "jhon03@example.com",
    password: "Jhon@123456",
  });

  const { token, user } = authResponse.body;

  return { token, user, userCreated };
}
