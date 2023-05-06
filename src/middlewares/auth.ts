import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface TokenPayLoad {
  token: string;
  id: string;
  iat: number;
  exp: number;
}

export async function AuthMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json("Not authorization");
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET as string);

    const { id } = data as TokenPayLoad;

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return response.status(401).json("Not authorization");
    }

    request.userId = id;
    request.token = token;

    return next();
  } catch (error) {
    return response.status(401).json("Not authorization");
  }
}
