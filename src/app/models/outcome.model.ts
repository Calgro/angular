export class Outcome {
  public statusCode: string;
  public status: string;
  public message: string;

  constructor (statusCode: string, status: string, message: string) {
    this.statusCode = statusCode;
    this.status = status;
    this.message = message;
  }
}
