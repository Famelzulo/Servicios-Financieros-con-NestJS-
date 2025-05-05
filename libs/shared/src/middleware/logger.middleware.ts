import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const start = Date.now();

    res.on('finish', () => {
      const responseTime = Date.now() - start;
      const { statusCode } = res;
      if (method == "GET") {
        console.log(`[${method}] ${originalUrl} - ${statusCode} - ${responseTime}ms`);
      }
      else if (method == "POST") {
        console.log(`[${method}] ${originalUrl} - ${statusCode} - ${responseTime}ms`);
        console.log(`[body] ${JSON.stringify(req.body)}`);
      }
    });

    next();
  }
}
