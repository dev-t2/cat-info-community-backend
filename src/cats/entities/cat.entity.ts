import { Cat as CatModel } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class Cat implements CatModel {
  @ApiProperty({ required: true, description: '아이디' })
  @IsPositive()
  id: number;

  @ApiProperty({ required: true, description: '이메일' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true, description: '닉네임' })
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @ApiProperty({ required: true, description: '비밀번호' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: '아바타' })
  @IsString()
  avatar: string | null;

  @ApiProperty({ description: '생성된 시간' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ description: '업데이트된 시간' })
  @IsDate()
  updatedAt: Date;
}
