import { Injectable } from '@nestjs/common';

import { CommentsRepository } from './comments.repository';
import { CatDto } from 'src/cats/cats.dto';
import { CreateCommentDto } from './comments.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async createComment(catId: number, catDto: CatDto, createComment: CreateCommentDto) {
    return await this.commentsRepository.createComment(catId, catDto.id, createComment.content);
  }

  async findComments() {
    return await this.commentsRepository.findComments();
  }

  async increaseLikes(id: number) {
    return await this.commentsRepository.increaseLikes(id);
  }
}
