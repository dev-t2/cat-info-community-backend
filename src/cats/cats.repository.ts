import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Cat } from './cats.schema';
import { SignUpDto } from './cats.dto';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async existsEmail(email: string) {
    return await this.catModel.exists({ email });
  }

  async existsNickname(nickname: string) {
    return await this.catModel.exists({ nickname });
  }

  async signUp(signUpDto: SignUpDto) {
    return await this.catModel.create(signUpDto);
  }

  async findCatByEmail(email: string) {
    return await this.catModel.findOne({ email });
  }
}
