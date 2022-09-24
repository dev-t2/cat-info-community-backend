import { Injectable } from '@nestjs/common';

import { CreateCatDto, UpdateCatDto } from './cats.dto';

@Injectable()
export class CatsService {
  createCat(createCatDto: CreateCatDto) {
    return { createCatDto };
  }

  findCats() {
    return 'findCats';
  }

  findCat(id: string) {
    return `findCat ${id}`;
  }

  updateCat(id: string, updateCatDto: UpdateCatDto) {
    return { id, updateCatDto };
  }

  removeCat(id: string) {
    return `removeCat ${id}`;
  }
}
