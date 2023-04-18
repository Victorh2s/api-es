import { Request, Response } from "express";
import { UpdateStatusTaskServices } from "../../../services/TaskServices/UpdateStatusTask";

export async function UpdateStatusTask(request: Request, response: Response) {
  const { id } = request.params;
  const { status: stt } = request.body;
  const { userId } = request;

  try {
    const updatedTask = await UpdateStatusTaskServices(userId, id, stt);

    return response.status(200).json(updatedTask);
  } catch (err: any) {
    return response.status(400).json({
      message: err.message,
    });
  }
}
