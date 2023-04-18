import { Router } from "express";
import { GetUser } from "../http/controllers/UserController/GetUser";
import { CreateUser } from "../http/controllers/UserController/CreateUser";
import { UpdateUser } from "../http/controllers/UserController/UpdateUser";
import { DeleteUser } from "../http/controllers/UserController/DeleteUser";
import { AuthMiddleware } from "../middlewares/auth";
import { GetAllUsersDev } from "../http/controllers/UserController/GetAllUsersDev";

export const RouteUser = Router();

RouteUser.get("/getalluser", GetAllUsersDev);
RouteUser.get("/", AuthMiddleware, GetUser);
RouteUser.post("/", CreateUser);
RouteUser.put("/", AuthMiddleware, UpdateUser);
RouteUser.delete("/", AuthMiddleware, DeleteUser);
