import { NextFunction, Request, Response } from 'express';

import ApiError from '@shared/errors/APIError';
import { InternalError } from '@shared/errors/internalErrors';

export const InternalErrorHandler = (
  error: unknown,
  _: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  return error instanceof InternalError
    ? res.status(error.code).json(
        ApiError.format({
          code: error.code,
          message: error.message,
          description: error.description,
          documentation: error.documentation,
        }),
      )
    : next(error);
};
