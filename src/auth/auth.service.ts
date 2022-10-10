import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { CatsRepository } from 'src/cats/cats.repository';
import { SignInDto } from 'src/cats/cats.dto';
import { IPayload } from './auth.interface';

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

    const payload: IPayload = { id: cat.id, email: cat.email };

    return { accessToken: this.jwtService.sign(payload) };
  }
}
