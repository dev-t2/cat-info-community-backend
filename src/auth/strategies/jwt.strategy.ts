import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { CatsRepository } from 'src/cats/cats.repository';
import { IPayload } from './jwt.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate({ sub }: IPayload) {
    const cat = await this.catsRepository.findCatById(sub);

    if (!cat) {
      throw new UnauthorizedException('로그인 정보를 확인해 주세요');
    }

    return cat;
  }
}
