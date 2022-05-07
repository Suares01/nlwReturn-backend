import ApiError, { IAPIErrorResponse } from '../APIError';

describe('APIError', () => {
  it('should return format error with mandatory fields', () => {
    const error = ApiError.format({
      message: 'email needs to be provided',
      code: 422,
    });

    expect(error).toEqual<IAPIErrorResponse>({
      message: 'email needs to be provided',
      code: 422,
      error: 'Unprocessable Entity',
    });
  });

  it('should return format error with mandatory fields and description', () => {
    const error = ApiError.format({
      message: 'User not found',
      code: 404,
      description:
        'This error happens when the user is not found in the database',
    });

    expect(error).toEqual<IAPIErrorResponse>({
      message: 'User not found',
      code: 404,
      error: 'Not Found',
      description:
        'This error happens when the user is not found in the database',
    });
  });

  it('should return format error with mandatory fields and documentation', () => {
    const error = ApiError.format({
      message: 'Username already exists',
      code: 409,
      documentation: 'https://api.com/docs',
    });

    expect(error).toEqual<IAPIErrorResponse>({
      message: 'Username already exists',
      code: 409,
      error: 'Conflict',
      documentation: 'https://api.com/docs',
    });
  });

  it('should return format error with mandatory fields and documentation', () => {
    const error = ApiError.format({
      message: 'Token missing',
      code: 401,
      documentation: 'https://api.com/docs',
      description: "This error happens when the token wasn't provided",
    });

    expect(error).toEqual<IAPIErrorResponse>({
      message: 'Token missing',
      code: 401,
      error: 'Unauthorized',
      documentation: 'https://api.com/docs',
      description: "This error happens when the token wasn't provided",
    });
  });
});
