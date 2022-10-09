import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CatsService } from './cats.service';
import { CreateCatDto } from './cats.dto';

@ApiTags('CAT')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiOperation({ summary: '회원가입' })
  @Post()
  async createCat(@Body() createCatDto: CreateCatDto) {
    return await this.catsService.createCat(createCatDto);
  }
}
