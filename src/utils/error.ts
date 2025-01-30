export class CustomError extends Error {
  constructor(public message: string) {
    super(message);

    this.message = message;
  }
}
