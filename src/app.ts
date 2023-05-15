import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { RouteUser } from "./routes/UserRouter";
import { RouteTask } from "./routes/TaskRouter";
import { RouteLogin } from "./routes/LoginRouter";
import { RouteLogout } from "./routes/LogoutRouter";
import { RouteRefreshToken } from "./routes/RefreshTokenRouter";
import * as dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

export const app = express();

dotenv.config();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.use("/user", RouteUser);
app.use("/task", RouteTask);
app.use("/login", RouteLogin);
app.use("/token/refresh", RouteRefreshToken);
app.use("/logout", RouteLogout);
app.use(cookieParser());
