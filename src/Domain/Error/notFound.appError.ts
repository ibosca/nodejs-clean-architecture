import { AppError } from "./appError";

export const NOT_FOUND_HTTP_CODE = 404;
export const NOT_FOUND_MESSAGE = 'Not found';
export class NotFoundAppError extends AppError {

  constructor() {
    super(NOT_FOUND_MESSAGE, NOT_FOUND_HTTP_CODE);
  }
}