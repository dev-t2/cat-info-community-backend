import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CatsService } from './cats.service';
import { AuthService } from 'src/auth/auth.service';
import { FindCatDto, SignInDto, SignUpDto } from './cats.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Cat } from 'src/common/decorators/cat.decorator';

@ApiTags('CAT')
@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '회원가입' })
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.catsService.signUp(signUpDto);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }

  @ApiOperation({ summary: '로그아웃' })
  @UseGuards(JwtAuthGuard)
  @Post('signout')
  signOut() {
    return this.catsService.signOut();
  }

  @ApiOperation({ summary: '프로필 정보' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findCat(@Cat() findCatDto: FindCatDto) {
    return findCatDto;
  }
}
