import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto } from './cats.dto';

@Injectable()
export class CatsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findCatByEmail(email: string) {
    return await this.prismaService.cat.findUnique({
      where: { email },
      select: { id: true, email: true, password: true },
    });
  }

  async findCatByNickname(nickname: string) {
    return await this.prismaService.cat.findUnique({
      where: { nickname },
      select: { id: true },
    });
  }

  async signUp({ email, nickname, password }: SignUpDto) {
    await this.prismaService.cat.create({
      data: { email, nickname, password },
      select: { id: true },
    });
  }

  async findCatById(id: number) {
    return await this.prismaService.cat.findUnique({
      where: { id },
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

  async findCat(id: number) {
    return await this.prismaService.cat.findUnique({
      where: { id },
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

  async uploadAvatar(id: number, fileName: string) {
    return await this.prismaService.cat.update({
      where: { id },
      data: { avatar: fileName },
      select: { avatar: true },
    });
  }

  async findCats(id: number) {
    return await this.prismaService.cat.findMany({
      where: { id: { not: id } },
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
