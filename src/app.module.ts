import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './models/category/category.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './models/auth/auth.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from './validation/validation.pipe';
import { RolesGuard } from './role/roles.guard';
import { AuthMiddleware } from './auth/auth.middleware';
import { TransformMiddleware } from './middlewares/transform.middleware';

@Module({
  imports: [PrismaModule, AuthModule, CategoryModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, TransformMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
