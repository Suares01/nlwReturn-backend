import { InternalError } from './InternalError';

export class UnprocessableEntityError extends InternalError {
  constructor(
    public message: string,
    public code: number = 422,
    public description?: string,
    public documentation?: string,
  ) {
    super(message, code, description, documentation);
  }
}
