import { IsNumberString, IsString } from 'class-validator';

export class Cat {
  @IsString()
  name: string;
  @IsNumberString()
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
