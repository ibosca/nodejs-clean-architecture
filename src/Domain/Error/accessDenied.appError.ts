import { AppError } from "./appError";

export const ACCESS_DENIED_HTTP_CODE = 401;
export class AccessDeniedAppError extends AppError {

  constructor() {
    super('Access denied', ACCESS_DENIED_HTTP_CODE);
  }
}