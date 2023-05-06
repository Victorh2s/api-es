import { Router } from "express";
import { Logout } from "../http/controllers/LogoutController/Logout";
import { AuthMiddleware } from "../middlewares/auth";

export const RouteLogout = Router();

RouteLogout.post("/", AuthMiddleware, Logout);
