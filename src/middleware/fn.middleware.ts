import { timeout } from 'rxjs/operators';
import { Body } from '@nestjs/common';
/**
 * 函数式中间件
 * @param req
 * @param res
 * @param next
 */
export function fn(req, res, next) {
  console.log(`fnMiddleware->req.baseUrl`, req.originalUrl);
  next();
}
