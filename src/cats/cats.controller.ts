import { Body, Controller, Post } from '@nestjs/common';

import { CatsService } from './cats.service';
import { SignUpDto } from './cats.dto';

@Controller('api/cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.catsService.signUp(signUpDto);
  }
}
