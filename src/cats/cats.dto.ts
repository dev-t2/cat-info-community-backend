import { PickType } from '@nestjs/swagger';

import { Cat } from './cats.entity';

export class SignUpDto extends PickType(Cat, ['email', 'nickname', 'password'] as const) {}
