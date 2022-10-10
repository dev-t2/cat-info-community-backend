import { PickType } from '@nestjs/swagger';

import { Cat } from './entities/cat.entity';

export class SignUpDto extends PickType(Cat, ['email', 'nickname', 'password'] as const) {}

export class SignInDto extends PickType(Cat, ['email', 'password'] as const) {}
