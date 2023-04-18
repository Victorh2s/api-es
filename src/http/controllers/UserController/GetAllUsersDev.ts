import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GetAllUsersDev(request: Request, response: Response) {
  try {
    const findUser = await prisma.user.findMany();

    return response.status(200).json(findUser);
  } catch (err: any) {
    return response.status(400).json({
      message: err.message,
    });
  }
}
