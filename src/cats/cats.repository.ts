import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto } from './cats.dto';

@Injectable()
export class CatsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async existsEmail(email: string) {
    return await this.prismaService.cat.findUnique({ where: { email } });
  }

  async existsNickname(nickname: string) {
    return await this.prismaService.cat.findUnique({ where: { nickname } });
  }

  async signUp({ email, nickname, password }: SignUpDto) {
    await this.prismaService.cat.create({ data: { email, nickname, password } });
  }
}
