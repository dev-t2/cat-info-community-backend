import { Module } from '@nestjs/common';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatsRepository } from './cats.repository';

@Module({
  controllers: [CatsController],
  providers: [PrismaService, CatsService, CatsRepository],
})
export class CatsModule {}
