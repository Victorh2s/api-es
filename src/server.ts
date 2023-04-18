import { env } from "process";
import { app } from "./app";

// interface TokenPayLoad {
//   token: string;
//   id: number;
//   email: string;
//   name: string;
//   iat: number;
//   exp: number;
// }

app.listen(env.PORT, () => {
  console.log(`Server is running on port http://localhost:${env.PORT}`);
});
