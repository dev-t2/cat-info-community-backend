import { Module } from '@nestjs/common';

import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatsRepository } from './cats.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService, CatsRepository, PrismaService],
})
export class CatsModule {}
