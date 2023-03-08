import { NextFunction, Request, Response } from 'express';

/**
 * 全局中间件
 * @param req
 * @param res
 * @param next
 */
export function globalMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(`globalMiddleware->req.baseUrl`, req.originalUrl);
  next();
}
