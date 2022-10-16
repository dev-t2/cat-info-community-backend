import { BadRequestException, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { CatsRepository } from './cats.repository';
import { AwsService } from 'src/aws/aws.service';
import { CatDto, FilesDto, SignUpDto } from './cats.dto';

@Injectable()
export class CatsService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private readonly awsService: AwsService,
  ) {}

  async signUp({ email, nickname, password }: SignUpDto) {
    const isEmail = await this.catsRepository.findCatByEmail(email);

    if (isEmail) {
      throw new BadRequestException('이미 사용 중인 이메일입니다');
    }

    const isNickname = await this.catsRepository.findCatByNickname(nickname);

    if (isNickname) {
      throw new BadRequestException('이미 사용 중인 닉네임입니다');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.catsRepository.signUp(email, nickname, hashedPassword);
  }

  async findCats({ id }: CatDto) {
    return await this.catsRepository.findCats(id);
  }

  async profile({ id }: CatDto) {
    return await this.catsRepository.findCat(id);
  }

  async updateAvatar({ id }: CatDto, filesDto: FilesDto) {
    if (filesDto.length === 0) {
      await this.awsService.deleteAvatar(id);

      return await this.catsRepository.updateAvatar(id, '');
    }

    const url = await this.awsService.updateAvatar(id, filesDto[0]);

    return await this.catsRepository.updateAvatar(id, url);
  }
}
