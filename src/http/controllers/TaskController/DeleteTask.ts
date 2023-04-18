import { Request, Response } from "express";
import { DeleteTaskServices } from "../../../services/TaskServices/DeleteTask";

export async function DeleteTask(request: Request, response: Response) {
  const { userId } = request;
  const { id } = request.params;
  try {
    const taskDeleted = await DeleteTaskServices(userId, id);

    return response.status(200).json(taskDeleted);
  } catch (err: any) {
    return response.status(400).json({
      message: err.message,
    });
  }
}
