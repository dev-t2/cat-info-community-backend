import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export type CatDocument = Cat & Document;

@Schema({ timestamps: true })
export class Cat extends Document {
  @IsEmail()
  @IsNotEmpty()
  @Prop({ required: true, unique: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Prop({ required: true, unique: true })
  nickname: string;

  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Prop()
  avatar: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
