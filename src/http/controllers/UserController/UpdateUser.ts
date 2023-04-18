import { Request, Response } from "express";
import { UpdateUniqueUser } from "../../../services/UserServices/UpdateUser";

export async function UpdateUser(request: Request, response: Response) {
  const { userId } = request;
  const { username, description } = request.body;
  try {
    const updateUser = await UpdateUniqueUser(userId, username, description);
    return response.status(200).json(updateUser);
  } catch (err: any) {
    return response.status(400).json({
      message: err.message,
    });
  }
}
