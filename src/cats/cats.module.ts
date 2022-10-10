import { forwardRef, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatsRepository } from './cats.repository';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
    MulterModule.register({ dest: './upload' }),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsRepository],
})
export class CatsModule {}
