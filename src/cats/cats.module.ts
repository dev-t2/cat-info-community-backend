import { forwardRef, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatsRepository } from './cats.repository';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    PrismaModule,
    MulterModule.register({ dest: './upload' }),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsRepository],
})
export class CatsModule {}
