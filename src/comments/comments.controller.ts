import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { CommentsService } from './comments.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ParsePositiveIntPipe } from 'src/common/pipes/parse-positive-int.pipe';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: '댓글 생성' })
  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async createComment(@Param('id', ParsePositiveIntPipe) id: number) {
    return await this.commentsService.createComment(id);
  }

  @ApiOperation({ summary: '댓글 리스트' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findComments() {
    return await this.commentsService.findComments();
  }
}
