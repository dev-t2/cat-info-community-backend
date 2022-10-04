import { Injectable, BadRequestException } from '@nestjs/common';

import { CatsRepository } from './cats.repository';
import { SignUpDto } from './cats.dto';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async signUp({ email, nickname, password }: SignUpDto) {
    const isExistsEmail = await this.catsRepository.existsEmail(email);

    if (isExistsEmail) {
      throw new BadRequestException('이미 존재하는 이메일입니다.');
    }

    const isExistsNickname = await this.catsRepository.existsNickname(nickname);

    if (isExistsNickname) {
      throw new BadRequestException('이미 존재하는 닉네임입니다.');
    }

    return await this.catsRepository.signUp({ email, nickname, password });
  }
}
