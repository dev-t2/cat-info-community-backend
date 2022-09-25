import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';

import { Cat } from './cats.schema';
import { SignUpDto } from './cats.dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async signUp({ email, nickname, password }: SignUpDto) {
    const isExistsEmail = await this.catModel.exists({ email });

    if (isExistsEmail) {
      throw new BadRequestException('이미 존재하는 이메일입니다.');
    }

    const isExistsNickname = await this.catModel.exists({ nickname });

    if (isExistsNickname) {
      throw new BadRequestException('이미 존재하는 닉네임입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catModel.create({ email, nickname, password: hashedPassword });

    return cat;
  }
}
