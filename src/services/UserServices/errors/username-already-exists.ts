export class UsernameAlreadyExists extends Error {
  constructor() {
    super("Username already exists");
  }
}
