import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import expressBasicAuth from 'express-basic-auth';

import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.get(PrismaService).enableShutdownHooks(app);

  app.enableCors({ origin: true, credentials: true });

  const configService = app.get(ConfigService);
  const ADMIN_USER = configService.get('ADMIN_USER');
  const ADMIN_PASSWORD = configService.get('ADMIN_PASSWORD');

  app.use(
    ['/api', '/api-json'],
    expressBasicAuth({ challenge: true, users: { [ADMIN_USER]: ADMIN_PASSWORD } }),
  );

  const config = new DocumentBuilder()
    .setTitle('Cats App API')
    .setDescription('Cats App API Document')
    .setVersion('1.0.0')
    .build();

  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, config));

  await app.listen(3000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
