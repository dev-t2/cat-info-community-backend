import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/common/prisma.service';
import { SignUpDto } from './cats.dto';

@Injectable()
export class CatsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findEmail(email: string) {
    return await this.prismaService.cat.findUnique({ where: { email }, select: { id: true } });
  }

  async findNickname(nickname: string) {
    return await this.prismaService.cat.findUnique({ where: { nickname }, select: { id: true } });
  }

  async signUp({ email, nickname, password }: SignUpDto) {
    return await this.prismaService.cat.create({
      data: { email, nickname, password },
      select: {
        id: true,
        email: true,
        nickname: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
