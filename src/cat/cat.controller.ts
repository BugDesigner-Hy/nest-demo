import { timeInterval, timeout } from 'rxjs/operators';
import { ValidationPipe } from './../pipe/validate.pipe';
import { ParseIntPipe } from './../pipe/parse-int.pipe';
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
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { R } from 'src/common/R';
import { Cat } from './Cat';
import { CatService } from './cat.service';
import { Roles } from 'src/decorator/roles.decorator';

// interface Cat {
//   name: string;
//   age?: number;
// }

@Controller({ host: ':account', path: 'cat' } as ControllerOptions)
export class CatController {
  constructor(private catService: CatService) {}

  @Post()
  @Roles('admin')
  create(
    @Body(new ValidationPipe()) cat: Cat,
    @HostParam('account') account: string,
  ): R {
    // const timeout = 5;
    // setTimeout(() => {
    //   console.log(`output->timeout`, timeout, 's');
    // }, timeout * 1000);
    console.log(`output->Param`, cat);
    console.log(`output->account`, account);
    this.catService.create(cat);
    return R.success(cat);
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

  @Get('/byThrowException')
  getByThrowException(@Query() param: Cat): object {
    console.log(`output->req.query`, param);
    throw new HttpException('this is exception', HttpStatus.FORBIDDEN);
  }

  @Get('/async')
  async getByAsync(@Query() param: Cat): Promise<R> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cats: Array<Cat> = this.catService.findAll();
        resolve(R.success(cats));
      }, 1000);
    });
  }

  @Put('/:id')
  update() {
    return '';
  }

  @Delete('/:id')
  delete(@Param('id', new ParseIntPipe()) id) {
    return '';
  }
}
