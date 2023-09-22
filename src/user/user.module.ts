import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserServices } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { VerifyIdMiddleware } from 'src/middlewares/user/verifyIdUser.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_NEW_PASSWORD,
      signOptions: { expiresIn: 300 },
    }),
  ],
  controllers: [UserController],
  providers: [UserServices],
  exports: [UserServices],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyIdMiddleware)
      .exclude(
        { path: 'user/not-active', method: RequestMethod.GET },
        { path: 'user/active', method: RequestMethod.GET },
        { path: 'user/new-password', method: RequestMethod.PATCH },
      )
      .forRoutes(
        { path: 'user/:id', method: RequestMethod.GET },
        { path: 'user/:id', method: RequestMethod.PATCH },
        { path: 'user/:id', method: RequestMethod.DELETE },
      );
  }
}
