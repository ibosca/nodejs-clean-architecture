import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnauthorizedExceptionFilter } from "./Infrastructure/ExceptionFilter/unauthorized.exceptionFilter";
import { AppErrorExceptionFilter } from "./Infrastructure/ExceptionFilter/appError.exceptionFilter";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NotFoundExceptionFilter } from "./Infrastructure/ExceptionFilter/notFound.exceptionFilter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new UnauthorizedExceptionFilter());
  app.useGlobalFilters(new AppErrorExceptionFilter());
  app.useGlobalFilters(new NotFoundExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('NodeJs Clean Architecutre')
    .setDescription('Example implementation of a Clean Architecture on top of Nestjs framework')
    .setVersion('1.0')
    .addTag('Authentication')
    .addTag('Clients')
    .addTag('Policies')
    .addBasicAuth()
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('apidoc', app, document);

  await app.listen(3000);
}
bootstrap();
