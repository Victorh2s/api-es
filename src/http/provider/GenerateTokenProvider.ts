import jwt from "jsonwebtoken";

export class GenerateTokenProvider {
  execute(userId: string) {
    const token = jwt.sign({ id: userId }, process.env.TOKEN_SECRET as string, {
      subject: userId,
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return token;
  }
}
