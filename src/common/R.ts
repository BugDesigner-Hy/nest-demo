import { HttpStatus } from '@nestjs/common';

export class R {
  code: HttpStatus;
  data: any;
  msg: string;

  constructor(code: HttpStatus, data: any, msg: string) {
    this.code = code;
    this.data = data;
    this.msg = msg;
  }

  static success(data: any, msg?: string): R {
    return new R(HttpStatus.OK, data, msg ? msg : 'success');
  }

  static error(data: any, msg?: string): R {
    return new R(HttpStatus.BAD_REQUEST, data, msg ? msg : 'error');
  }
}
