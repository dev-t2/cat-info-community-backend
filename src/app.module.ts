import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [PrismaModule, CatsModule],
})
export class AppModule {}
