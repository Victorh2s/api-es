export class InvalidPasswordRegx extends Error {
  constructor() {
    super(
      "The provided password is not strong enough. Be sure to use at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character '@', '$', '!', '%', '*', '? ', '&'. Try again with a stronger password."
    );
  }
}
