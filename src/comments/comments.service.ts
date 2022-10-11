import { Injectable } from '@nestjs/common';

import { CommentsRepository } from './comments.repository';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async createComment(id: number) {
    return await this.commentsRepository.createComment(id);
  }

  async findComments() {
    return await this.commentsRepository.findComments();
  }
}
