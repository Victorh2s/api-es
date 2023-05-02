export class NotAuthorized extends Error {
  constructor() {
    super("You are not authorized");
  }
}
