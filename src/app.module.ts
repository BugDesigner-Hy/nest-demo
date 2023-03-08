import { CatController } from './cat/cat.controller';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { DogModule } from './dog/dog.module';
import { fn } from './middleware/fn.middleware';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RolesGuard } from './guard/roles.guard';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { CacheInterceptor } from './interceptor/cache.interceptor';
import { TimeoutInterceptor } from './interceptor/timeout.interceptor';

@Module({
  imports: [CatModule, DogModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, fn).forRoutes(CatController);
  }
}
