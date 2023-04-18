export class ToolBox {
  checkStatus(stt: string) {
    const regex = /^(Pendente|Fazendo|Feito)$/;

    if (!regex.test(stt)) {
      throw new Error(
        "Invalid status, the options are 'Pendente', 'Fazendo', 'Feito'"
      );
    }

    return stt;
  }

  regexPassword() {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  }
}
