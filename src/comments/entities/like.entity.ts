import { Like as LikeModel } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsPositive } from 'class-validator';

export class Like implements LikeModel {
  @ApiProperty({ required: true, description: '아이디' })
  @IsPositive()
  id: number;

  @ApiProperty({ required: true, description: '댓글' })
  @IsPositive()
  commentId: number;

  @ApiProperty({ required: true, description: '고양이' })
  @IsPositive()
  catId: number;

  @ApiProperty({ description: '생성된 시간' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ description: '업데이트된 시간' })
  @IsDate()
  updatedAt: Date;
}
