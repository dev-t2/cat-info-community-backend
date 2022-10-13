import { Injectable } from '@nestjs/common';

import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './comments.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async createComment(catId: number, authorId: number, createComment: CreateCommentDto) {
    return await this.commentsRepository.createComment(catId, authorId, createComment.content);
  }

  async findComments() {
    return await this.commentsRepository.findComments();
  }

  async like(commentId: number, catId: number) {
    const isLike = await this.commentsRepository.findLike(commentId, catId);

    if (isLike) {
      return await this.commentsRepository.unlikeComment(commentId, catId);
    }

    return await this.commentsRepository.likeComment(commentId, catId);
  }
}
