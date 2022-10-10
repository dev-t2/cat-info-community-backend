import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { CatsRepository } from 'src/cats/cats.repository';
import { SignInDto } from 'src/cats/cats.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({ email, password }: SignInDto) {
    const cat = await this.catsRepository.findCatByEmail(email);

    if (!cat) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해 주세요');
    }

    const isValidatedPassword = await bcrypt.compare(password, cat.password);

    if (!isValidatedPassword) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해 주세요');
    }

    return { accessToken: this.jwtService.sign({ sub: cat.id, email: cat.email }) };
  }
}
