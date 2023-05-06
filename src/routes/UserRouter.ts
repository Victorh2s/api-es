import { Router } from "express";
import { GetUser } from "../http/controllers/UserController/GetUser";
import { CreateUser } from "../http/controllers/UserController/CreateUser";
import { UpdateUser } from "../http/controllers/UserController/UpdateUser";
import { DeleteUser } from "../http/controllers/UserController/DeleteUser";
import { AuthMiddleware } from "../middlewares/auth";
import { ValidationSchema } from "../middlewares/validation-schema";
import { ValidationSchemaUpdateUser } from "../middlewares/validation-schema-updateuser";

export const RouteUser = Router();

RouteUser.get("/", AuthMiddleware, GetUser);
RouteUser.post("/", ValidationSchema, CreateUser);
RouteUser.put("/", AuthMiddleware, ValidationSchemaUpdateUser, UpdateUser);
RouteUser.delete("/", AuthMiddleware, DeleteUser);
