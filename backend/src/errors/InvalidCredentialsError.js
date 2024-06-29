export default class InvalidCredentialsError extends Error {
  constructor(message, statusCode = 400) {
    super("Invalid credentials");
    this.name = "InvalidCredentialsError";
    this.message = message;
    this.statusCode = statusCode;
  }
}
