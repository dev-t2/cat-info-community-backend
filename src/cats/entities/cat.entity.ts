import { Cat as CatModel } from '@prisma/client';
import {
  IsAlphanumeric,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Cat implements CatModel {
  @ApiProperty({ required: true, description: '아이디' })
  @IsPositive()
  id: number;

  @ApiProperty({ required: true, description: '이메일' })
  @IsEmail()
  @IsNotEmpty()
  @Length(10, 30)
  email: string;

  @ApiProperty({ required: true, description: '닉네임' })
  @IsAlphanumeric()
  @IsNotEmpty()
  @Length(2, 10)
  nickname: string;

  @ApiProperty({ required: true, description: '비밀번호' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: '아바타' })
  @IsString()
  @IsNotEmpty()
  avatar: string | null;

  @ApiProperty({ description: '생성된 시간' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ description: '업데이트된 시간' })
  @IsDate()
  updatedAt: Date;
}
