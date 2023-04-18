import { Request, Response } from "express";
import { CreateTokenServices } from "../../../services/AuthServices/CreateToken";

export async function CreateToken(request: Request, response: Response) {
  const { email, password } = request.body;

  try {
    const { refreshToken, token, user } = await CreateTokenServices(
      email,
      password
    );
    return response
      .status(200)
      .cookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .json({
        token,
        user,
      });
  } catch (err: any) {
    return response.status(400).json({
      message: err.message,
    });
  }
}
