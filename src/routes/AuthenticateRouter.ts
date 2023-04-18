import { Router } from "express";
import { CreateToken } from "../http/controllers/AuthController/CreateToken";

export const RouterAuthenticate = Router();

RouterAuthenticate.post("/", CreateToken);
