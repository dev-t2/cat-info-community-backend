import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import expressBasicAuth from 'express-basic-auth';

import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.get(PrismaService).enableShutdownHooks(app);

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({ origin: true, credentials: true });

  app.use(
    ['/api', '/api-json'],
    expressBasicAuth({
      challenge: true,
      users: { [process.env.ADMIN_USER]: process.env.ADMIN_PASSWORD },
    }),
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
