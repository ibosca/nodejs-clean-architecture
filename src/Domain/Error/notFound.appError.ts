import { AppError } from "./appError";

export const NOT_FOUND_HTTP_CODE = 404;
export class NotFoundAppError extends AppError {

  constructor() {
    super('Not found', NOT_FOUND_HTTP_CODE);
  }
}