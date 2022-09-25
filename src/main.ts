import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  const configService = app.get(ConfigService);

  const port = configService.get('PORT');

  await app.listen(port);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
