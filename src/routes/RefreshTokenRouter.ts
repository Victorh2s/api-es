import { Router } from "express";
import { RefreshToken } from "../http/controllers/RefreshController/RefreshToken";

export const RouteRefreshToken = Router();

RouteRefreshToken.post("/", RefreshToken);
