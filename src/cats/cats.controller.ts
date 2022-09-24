import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { CatsService } from './cats.service';
import { CreateCatDto, UpdateCatDto } from './cats.dto';

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

  @Put(':id')
  updateCat(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.updateCat(id, updateCatDto);
  }

  @Delete(':id')
  removeCat(@Param('id') id: string) {
    return this.catsService.removeCat(id);
  }
}
