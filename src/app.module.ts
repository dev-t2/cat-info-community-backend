import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CatsModule } from './cats/cats.module';
import { CommentsModule } from './comments/comments.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

@Module({
  imports: [PrismaModule, AuthModule, CatsModule, CommentsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
