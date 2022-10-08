import { Injectable, BadRequestException } from '@nestjs/common';

import { CatsRepository } from './cats.repository';
import { SignUpDto } from './cats.dto';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async signUp({ email, nickname, password }: SignUpDto) {
    const isEmail = await this.catsRepository.findEmail(email);

    if (isEmail) {
      throw new BadRequestException('이미 사용 중인 이메일입니다');
    }

    const isNickname = await this.catsRepository.findNickname(nickname);

    if (isNickname) {
      throw new BadRequestException('이미 사용 중인 닉네임입니다');
    }

    return await this.catsRepository.signUp({ email, nickname, password });
  }
}
