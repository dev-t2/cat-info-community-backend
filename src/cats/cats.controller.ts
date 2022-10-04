import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CatsService } from './cats.service';
import { SignUpDto } from './cats.dto';

@ApiTags('CAT')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiCreatedResponse({ description: '회원가입 완료' })
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.catsService.signUp(signUpDto);
  }
}
