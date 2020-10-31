import { AppError } from "./appError";

export const ACCESS_DENIED_HTTP_CODE = 401;
export const ACCESS_DENIED_MESSAGE = 'Access denied';
export class AccessDeniedAppError extends AppError {

  constructor() {
    super(
      ACCESS_DENIED_MESSAGE,
      ACCESS_DENIED_HTTP_CODE
    );
  }
}