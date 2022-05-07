export class InternalError extends Error {
  constructor(
    public message: string,
    public code: number = 500,
    public description?: string,
    public documentation?: string,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
