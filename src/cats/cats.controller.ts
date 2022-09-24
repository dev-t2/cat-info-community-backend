import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CatsService } from './cats.service';
import { CreateCatDto } from './cats.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  createCat(@Body() createCatDto: CreateCatDto) {
    return this.catsService.createCat(createCatDto);
  }

  @Get()
  findCats() {
    return this.catsService.findCats();
  }

  @Get(':id')
  findCat(@Param('id') id: string) {
    return this.catsService.findCat(id);
  }
}
