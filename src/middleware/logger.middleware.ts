import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

/**
 * 实现 NestMiddleware 接口
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`loggerMiddleware->req.baseurl`, req.originalUrl);
    console.log(`loggerMiddleware->res.cookie`, res.cookie);
    req['user'] = ['user', 'admin'];
    next();
  }
}
