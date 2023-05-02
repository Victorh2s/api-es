export class InvalidStatus extends Error {
  constructor() {
    super("Invalid status, the options are 'Pendente', 'Fazendo', 'Feito'");
  }
}
