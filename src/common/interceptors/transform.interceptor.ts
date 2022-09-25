import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  private readonly logger = new Logger(TransformInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.log('TransformInterceptor Intercept Method');

    return next
      .handle()
      .pipe(tap(() => this.logger.log('TransformInterceptor Tap Function')))
      .pipe(map((data) => data ?? null));
  }
}
