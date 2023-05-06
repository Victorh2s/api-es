export class InvalidUsernameRegx extends Error {
  constructor() {
    super(
      "The username field must contain uppercase and lowercase letters, numbers and special characters. No spaces or other invalid characters"
    );
  }
}
