import { Express } from "express";
import request from "supertest";

export async function createAuthenticateUser(app: Express) {
  const authResponse = await request(app).post("/login").send({
    email: "jhon001@example.com",
    password: "Jhon@123456",
  });

  const { refreshToken, token, user } = authResponse.body;

  return { refreshToken, token, user };
}
