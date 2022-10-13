import { Comment as CommentModel } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsPositive, IsString } from 'class-validator';

export class Comment implements CommentModel {
  @ApiProperty({ required: true, description: '아이디' })
  @IsPositive()
  id: number;

  @ApiProperty({ required: true, description: '고양이' })
  @IsPositive()
  catId: number;

  @ApiProperty({ required: true, description: '작성자' })
  @IsPositive()
  authorId: number;

  @ApiProperty({ required: true, description: '댓글' })
  @IsString()
  content: string;

  @ApiProperty({ description: '생성된 시간' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ description: '업데이트된 시간' })
  @IsDate()
  updatedAt: Date;
}
