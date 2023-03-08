import { CatModule } from './../cat/cat.module';
import { Module } from '@nestjs/common';
import { DogService } from './dog.service';
import { DogController } from './dog.controller';

@Module({
  controllers: [DogController],
  providers: [DogService],
  imports: [CatModule],
})
export class DogModule {}
