import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();

    res.on('finish', () => {
      const contentLength = res.getHeader('content-length');

      const responseTime = Date.now() - startTime;

      this.logger.log(
        `${req.method} ${req.originalUrl} ${res.statusCode} ${responseTime} ms - ${contentLength}`,
      );
    });

    next();
  }
}
