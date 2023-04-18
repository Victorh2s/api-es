import { AuthMiddleware } from "../middlewares/auth";
import { CreateTask } from "../http/controllers/TaskController/CreateTask";
import { DeleteTask } from "../http/controllers/TaskController/DeleteTask";
import { GetAllTask } from "../http/controllers/TaskController/GetAllTask";
import { GetUniqueTask } from "../http/controllers/TaskController/GetUniqueTask";
import { UpdateStatusTask } from "../http/controllers/TaskController/UpdateStatusTask";
import { UpdateTask } from "../http/controllers/TaskController/UpdateTask";
import { UpdateFinishatTask } from "../http/controllers/TaskController/UpdateFinishatTask";
import { Router } from "express";

export const RouteTask = Router();

RouteTask.get("/", AuthMiddleware, GetAllTask);
RouteTask.post("/", AuthMiddleware, CreateTask);
RouteTask.get("/:id", AuthMiddleware, GetUniqueTask);
RouteTask.put("/:id", AuthMiddleware, UpdateTask);
RouteTask.patch("/:id", AuthMiddleware, UpdateStatusTask);
RouteTask.patch("/updatedate/:id", AuthMiddleware, UpdateFinishatTask);
RouteTask.delete("/:id", AuthMiddleware, DeleteTask);
