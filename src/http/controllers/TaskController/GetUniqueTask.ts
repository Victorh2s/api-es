import { Request, Response } from "express";
import { GetUniqueTaskServices } from "../../../services/TaskServices/GetUniqueTask";

export async function GetUniqueTask(request: Request, response: Response) {
  const { id } = request.params;
  const { userId } = request;
  try {
    const allTaskFound = await GetUniqueTaskServices(userId, id);
    return response.status(200).json(allTaskFound);
  } catch (err: any) {
    return response.status(400).json({
      message: err.message,
    });
  }
}
