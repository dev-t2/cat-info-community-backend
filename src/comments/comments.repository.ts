import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createComment(catId: number, authorId: number, content: string) {
    return await this.prismaService.comment.create({
      data: { catId, authorId, content },
    });
  }

  async findComments() {
    return;
  }

  async findLike(commentId: number, catId: number) {
    return await this.prismaService.like.findUnique({
      where: { commentId_catId: { commentId, catId } },
    });
  }

  async likeComment(commentId: number, catId: number) {
    return await this.prismaService.like.create({
      data: { commentId, catId },
    });
  }

  async unlikeComment(commentId: number, catId: number) {
    return await this.prismaService.like.delete({
      where: { commentId_catId: { commentId, catId } },
    });
  }
}
