import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';

import { Cat } from './cats.schema';

export class CatDto extends OmitType(Cat, ['password'] as const) {
  @ApiProperty({ required: true, description: '아이디' })
  id: string;
}

export class SignUpDto extends PickType(Cat, ['email', 'nickname', 'password'] as const) {}
