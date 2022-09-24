import { Injectable } from '@nestjs/common';

import { CreateCatDto } from './cats.dto';

@Injectable()
export class CatsService {
  createCat(createCatDto: CreateCatDto) {
    return createCatDto;
  }

  findCats() {
    return 'findAll';
  }

  findCat(id: string) {
    return `findOne ${id}`;
  }
}
