import { AppError } from "./appError";

export const BAD_REQUEST_HTTP_CODE = 400;
export const BAD_REQUEST_MESSAGE = 'Bad request';
export class BadRequestAppError extends AppError {

  constructor() {
    super(
      BAD_REQUEST_MESSAGE,
      BAD_REQUEST_HTTP_CODE
    );
  }
}