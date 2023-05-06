import { Router } from "express";
import { CreateToken } from "../http/controllers/LoginController/CreateToken";

export const RouteLogin = Router();

RouteLogin.post("/", CreateToken);
