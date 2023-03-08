import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res: Response = ctx.getResponse();
    const req: Request = ctx.getRequest();
    console.log(`globalExceptionFilter->`, req.url);
    res.status(exception.getStatus()).json({
      code: exception.getStatus(),
      data: req.url,
      msg: exception.message,
    });
  }
}
