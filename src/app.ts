import express from "express";
import { RouteUser } from "./routes/UserRouter";
import { RouteTask } from "./routes/TaskRouter";
import { RouterAuthenticate } from "./routes/AuthenticateRouter";

export const app = express();

app.use(express.json());

app.use("/user", RouteUser);
app.use("/task", RouteTask);
app.use("/authenticate", RouterAuthenticate);
