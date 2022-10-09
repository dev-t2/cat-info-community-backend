import { BadRequestException, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { CatsRepository } from './cats.repository';
import { CreateCatDto } from './cats.dto';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async createCat({ email, nickname, password }: CreateCatDto) {
    const isEmail = await this.catsRepository.findCatByEmail(email);

    if (isEmail) {
      throw new BadRequestException('이미 사용 중인 이메일입니다');
    }

    const isNickname = await this.catsRepository.findCatByNickname(nickname);

    if (isNickname) {
      throw new BadRequestException('이미 사용 중인 닉네임입니다');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.catsRepository.createCat({ email, nickname, password: hashedPassword });
  }
}
