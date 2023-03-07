import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Req,
  Query,
  Param,
  Body,
  Res,
  ControllerOptions,
  HostParam,
  HttpStatus,
  ResponseDecoratorOptions,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { R } from 'src/common/R';
import { Cat } from './Cat';

// interface Cat {
//   name: string;
//   age?: number;
// }

@Controller({ host: ':account', path: 'cat' } as ControllerOptions)
export class CatController {
  @Post('')
  create(@Body() param: Cat, @HostParam('account') account: string): R {
    console.log(`output->Param`, param);
    console.log(`output->account`, account);
    return R.success(param);
  }

  @Get('/')
  findAll(
    @Req() req: Request,
    @Res({ passthrough: true } as ResponseDecoratorOptions) res: Response,
  ): object {
    console.log(`output->req`, req);
    if (req.query['name']) {
      return res.status(HttpStatus.OK).json(R.success(req.query));
    } else {
      res.status(HttpStatus.BAD_REQUEST).send(R.error(req.query));
    }
  }

  @Get('/byParam/:name/:age')
  getByParam(@Param() param: Cat): R {
    console.log(`output->req.param`, param instanceof Param);
    return R.success(param.age);
  }

  @Get('/byQuery')
  getByQuery(@Query() param: Cat): object {
    console.log(`output->req.query`, param);
    return R.success(param);
  }

  @Get('/async')
  async getByAsync(@Query() param: Cat): Promise<R> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(R.success(param));
      }, 2000);
    });
  }

  @Put('/:id')
  update() {
    return '';
  }

  @Delete('/:id')
  delete() {
    return '';
  }
}
