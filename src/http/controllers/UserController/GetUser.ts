import { Request, Response } from "express";
import { GetUniqueUser } from "../../../services/UserServices/GetUser";

export async function GetUser(request: Request, response: Response) {
  const { userId } = request;
  try {
    const user = await GetUniqueUser(userId);
    return response.status(200).json(user);
  } catch (err: any) {
    return response.status(400).json({
      message: err.message,
    });
  }
}
