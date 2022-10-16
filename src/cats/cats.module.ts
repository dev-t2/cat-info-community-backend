import { forwardRef, Module } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatsRepository } from './cats.repository';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [forwardRef(() => AuthModule), PrismaModule, AwsModule],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsRepository],
})
export class CatsModule {}
