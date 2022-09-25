import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@Schema({ timestamps: true })
export class Cat extends Document {
  @ApiProperty({ required: true, description: '이메일', example: 'oo_ri@naver.com' })
  @IsEmail()
  @IsNotEmpty()
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ required: true, description: '닉네임', example: 'dev-t2' })
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true, unique: true })
  nickname: string;

  @ApiProperty({ required: true, description: '비밀번호', example: 'password1234' })
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  password: string;

  @ApiProperty({ description: '아바타' })
  @IsString()
  @IsNotEmpty()
  @Prop()
  avatar: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
