import { Comment as CommentModel } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class Comment implements CommentModel {
  @ApiProperty({ required: true, description: '아이디' })
  @IsPositive()
  id: number;

  @ApiProperty({ required: true, description: '작성자 아이디' })
  @IsPositive()
  authorId: number;

  @ApiProperty({ required: true, description: '고양이 아이디' })
  @IsPositive()
  catId: number;

  @ApiProperty({ required: true, description: '댓글' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ required: true, description: '좋아요' })
  @IsPositive()
  likes: number;

  @ApiProperty({ description: '생성된 시간' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ description: '업데이트된 시간' })
  @IsDate()
  updatedAt: Date;
}
