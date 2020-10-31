import { AppError } from "./appError";

export const BAD_REQUEST_HTTP_CODE = 400;
export class BadRequestAppError extends AppError {

  constructor() {
    super('Bad request', BAD_REQUEST_HTTP_CODE);
  }
}