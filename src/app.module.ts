import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, CatsModule],
})
export class AppModule {}
