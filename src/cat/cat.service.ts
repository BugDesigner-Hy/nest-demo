import { Injectable } from '@nestjs/common';
import { Cat } from './Cat';

@Injectable()
export class CatService {
  // constructor() {}
  private readonly cats: Array<Cat> = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Array<Cat> {
    return this.cats;
  }
}
