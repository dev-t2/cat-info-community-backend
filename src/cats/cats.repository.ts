import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCatDto } from './cats.dto';

@Injectable()
export class CatsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findCatByEmail(email: string) {
    return await this.prismaService.cat.findUnique({ where: { email }, select: { id: true } });
  }

  async findCatByNickname(nickname: string) {
    return await this.prismaService.cat.findUnique({ where: { nickname }, select: { id: true } });
  }

  async createCat({ email, nickname, password }: CreateCatDto) {
    return await this.prismaService.cat.create({
      data: { email, nickname, password },
      select: { id: true, email: true, nickname: true, createdAt: true },
    });
  }
}
