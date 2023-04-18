import { Request, Response } from "express";
import { GetAllTaskServices } from "../../../services/TaskServices/GetAllTask";

export async function GetAllTask(request: Request, response: Response) {
  const { userId } = request;
  try {
    const allTaskFound = await GetAllTaskServices(userId);
    return response.status(200).json(allTaskFound);
  } catch (err: any) {
    return response.status(400).json({
      message: err.message,
    });
  }
}
