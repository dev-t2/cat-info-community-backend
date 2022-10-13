import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { CommentsService } from './comments.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Cat } from 'src/common/decorators/cat.decorator';
import { CatDto } from 'src/cats/cats.dto';
import { ParsePositiveIntPipe } from 'src/common/pipes/parse-positive-int.pipe';
import { CreateCommentDto } from './comments.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: '댓글 생성' })
  @UseGuards(JwtAuthGuard)
  @Post(':catId')
  async createComment(
    @Cat() { id }: CatDto,
    @Param('catId', ParsePositiveIntPipe) catId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return await this.commentsService.createComment(catId, id, createCommentDto);
  }

  @ApiOperation({ summary: '댓글 리스트' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findComments() {
    return await this.commentsService.findComments();
  }

  @ApiOperation({ summary: '좋아요' })
  @UseGuards(JwtAuthGuard)
  @Post(':commentId/likes')
  async increaseLikes(
    @Cat() { id }: CatDto,
    @Param('commentId', ParsePositiveIntPipe) commentId: number,
  ) {
    return await this.commentsService.like(commentId, id);
  }
}
