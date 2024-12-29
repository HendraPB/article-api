import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './models/auth/auth.module';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from './validation/validation.pipe';
import { TransformMiddleware } from './middlewares/transform.middleware';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe
    }
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TransformMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
