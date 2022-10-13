import { BadRequestException, Injectable } from '@nestjs/common';

import { CommentsRepository } from './comments.repository';
import { CatsRepository } from 'src/cats/cats.repository';
import { CreateCommentDto } from './comments.dto';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly catsRepository: CatsRepository,
  ) {}

  async createComment(catId: number, authorId: number, { content }: CreateCommentDto) {
    const isCat = await this.catsRepository.findCatById(catId);

    if (!isCat) {
      throw new BadRequestException('고양이 정보를 확인해 주세요');
    }

    return await this.commentsRepository.createComment(catId, authorId, content);
  }

  async findComments() {
    return await this.commentsRepository.findComments();
  }

  async like(commentId: number, catId: number) {
    const isComment = await this.commentsRepository.findCommentById(commentId);

    if (!isComment) {
      throw new BadRequestException('댓글 정보를 확인해 주세요');
    }

    const isLike = await this.commentsRepository.findLike(commentId, catId);

    if (isLike) {
      return await this.commentsRepository.unlikeComment(commentId, catId);
    }

    return await this.commentsRepository.likeComment(commentId, catId);
  }
}
