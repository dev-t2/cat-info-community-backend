import { BadRequestException, Injectable } from '@nestjs/common';

import { CatsRepository } from 'src/cats/cats.repository';
import { CommentsRepository } from './comments.repository';

@Injectable()
export class CommentsService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private readonly commentsRepository: CommentsRepository,
  ) {}

  async createComment(catId: number, authorId: number, content: string) {
    const isCat = await this.catsRepository.findCatById(catId);

    if (!isCat) {
      throw new BadRequestException();
    }

    return await this.commentsRepository.createComment(catId, authorId, content);
  }

  async findComments() {
    return await this.commentsRepository.findComments();
  }

  async like(commentId: number, catId: number) {
    const isComment = await this.commentsRepository.findCommentById(commentId);

    if (!isComment) {
      throw new BadRequestException();
    }

    const isLike = await this.commentsRepository.findLike(commentId, catId);

    if (isLike) {
      return await this.commentsRepository.unlikeComment(commentId, catId);
    }

    return await this.commentsRepository.likeComment(commentId, catId);
  }
}
