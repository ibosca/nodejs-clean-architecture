import { ExceptionFilter, Catch, ArgumentsHost, UnauthorizedException } from "@nestjs/common";
import { Response } from 'express';
import { AppResponseDto } from "../../Domain/DTO/Response/appResponse.dto";

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response
      .status(status)
      .json(AppResponseDto.accessDenied());
  }

}