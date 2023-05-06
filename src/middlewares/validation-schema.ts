import { Request, Response, NextFunction } from "express";

import { z } from "zod";

const CreateUserSchema = z.object({
  username: z
    .string({ required_error: "O campo username é obrigatório" })
    .min(3, "O username deve conter pelo menos 3 caracteres"),
  email: z
    .string({
      required_error: "O campo email é obrigatório",
    })
    .email("Email inválido"),
  password: z
    .string({ required_error: "O campo senha é obrigatório" })
    .min(6, "A senha deve conter pelo menos 6 caracteres."),
});

export async function ValidationSchema(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    CreateUserSchema.parse(request.body);

    return next();
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      const msg = err.issues.map((issue: any) => issue.message).join(", ");
      response.status(400).json({ message: msg });
    } else {
      response.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}
