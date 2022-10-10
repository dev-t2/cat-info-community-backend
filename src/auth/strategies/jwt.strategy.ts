import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { CatsRepository } from 'src/cats/cats.repository';
import { IPayload } from '../auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate({ id, email }: IPayload) {
    const cat = await this.catsRepository.findCatById(id);

    if (!cat || cat.email !== email) {
      throw new UnauthorizedException();
    }

    return cat;
  }
}
