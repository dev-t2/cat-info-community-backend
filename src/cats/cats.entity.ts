import { Cat as CatModel } from '@prisma/client';
import { IsDate, IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Cat implements CatModel {
  @ApiProperty({ required: true, description: '아이디', example: 1 })
  @IsInt()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ required: true, description: '이메일', example: 'Email Address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true, description: '닉네임', example: 'Nickname' })
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @ApiProperty({ required: true, description: '비밀번호', example: 'Password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: '아바타', example: 'Image URL' })
  @IsString()
  @IsNotEmpty()
  avatar: string;

  @ApiProperty({ description: '생성된 시간' })
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({ description: '업데이트된 시간' })
  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}
