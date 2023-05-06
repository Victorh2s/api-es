import { InvalidStatus } from "./errors/invalid-status";

export class ToolBox {
  checkStatus(stt: string) {
    const regex = /^(Pendente|Fazendo|Feito)$/;

    if (!regex.test(stt)) {
      throw new InvalidStatus();
    }

    return stt;
  }

  regexPassword() {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  }

  regexUsername() {
    return /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*$/;
  }
}
