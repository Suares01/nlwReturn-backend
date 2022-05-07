import httpStatus from 'http-status-codes';

export interface IAPIError {
  code: number;
  message: string;
  codeAsString?: string;
  description?: string;
  documentation?: string;
}

export interface IAPIErrorResponse extends Omit<IAPIError, 'codeAsString'> {
  error: string;
}

export default class ApiError {
  public static format({
    code,
    message,
    codeAsString,
    description,
    documentation,
  }: IAPIError): IAPIErrorResponse {
    return {
      ...{
        code,
        message,
        error: codeAsString || httpStatus.getStatusText(code),
      },
      ...(description && { description }),
      ...(documentation && { documentation }),
    };
  }
}
