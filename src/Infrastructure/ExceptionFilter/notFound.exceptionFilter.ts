import { ExceptionFilter, Catch, ArgumentsHost, NotFoundException } from "@nestjs/common";
import { Response } from 'express';
import { AppResponseDto } from "../../Domain/DTO/Response/appResponse.dto";

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response
      .status(status)
      .json(AppResponseDto.notFound());
  }

}