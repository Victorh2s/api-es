import { Request, Response } from "express";
import { DeleteUserServices } from "../../../services/UserServices/DeleteUser";

export async function DeleteUser(request: Request, response: Response) {
  const { userId } = request;

  try {
    const userDeleted = await DeleteUserServices(userId);
    return response.status(200).json(userDeleted);
  } catch (err: any) {
    return response.status(400).json({
      message: err.message,
    });
  }
}
