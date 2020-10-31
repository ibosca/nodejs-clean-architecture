import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { Response } from 'express';
import { AppResponseDto } from "../../Domain/DTO/Response/appResponse.dto";
import { AppError } from "../../Domain/Error/appError";
import { AccessDeniedAppError } from "../../Domain/Error/accessDenied.appError";
import { NotFoundAppError } from "../../Domain/Error/notFound.appError";
import { BadRequestAppError } from "../../Domain/Error/badRequest.appError";

@Catch(AppError)
export class AppErrorExceptionFilter implements ExceptionFilter {
  catch(exception: AppError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status);

    if (exception instanceof AccessDeniedAppError) {
      response.json(AppResponseDto.accessDenied());
    }

    if (exception instanceof NotFoundAppError) {
      response.json(AppResponseDto.notFound());
    }

    if (exception instanceof BadRequestAppError) {
      response.json(AppResponseDto.badRequest());
    }

  }

}