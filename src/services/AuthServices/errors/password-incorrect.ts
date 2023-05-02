export class PasswordIncorrect extends Error {
  constructor() {
    super("The password is incorrect");
  }
}
