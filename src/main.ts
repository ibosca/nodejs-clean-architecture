import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnauthorizedExceptionFilter } from "./Infrastructure/ExceptionFilter/unauthorized.exceptionFilter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new UnauthorizedExceptionFilter());
  await app.listen(3000);
}
bootstrap();
