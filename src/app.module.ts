import { CatController } from './cat/cat.controller';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { DogModule } from './dog/dog.module';
import { fn } from './middleware/fn.middleware';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [CatModule, DogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, fn).forRoutes(CatController);
  }
}
