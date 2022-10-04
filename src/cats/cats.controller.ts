import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CatsService } from './cats.service';
import { SignUpDto } from './cats.dto';

@ApiTags('CAT')
@Controller('api/cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiOperation({ summary: '회원가입' })
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    await this.catsService.signUp(signUpDto);
  }
}
