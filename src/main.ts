import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnauthorizedExceptionFilter } from "./Infrastructure/ExceptionFilter/unauthorized.exceptionFilter";
import { AppErrorExceptionFilter } from "./Infrastructure/ExceptionFilter/appError.exceptionFilter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new UnauthorizedExceptionFilter());
  app.useGlobalFilters(new AppErrorExceptionFilter());
  await app.listen(3000);
}
bootstrap();
