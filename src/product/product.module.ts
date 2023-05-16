import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductController } from './product.controller';
import { ProductServices } from './product.service';
import { VerifyIdProductMiddleware } from 'src/middlewares/product/verifyIdProduct.middleware';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [ProductServices],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyIdProductMiddleware)
      .forRoutes(
        { path: 'product/:id', method: RequestMethod.GET },
        { path: 'product/:id', method: RequestMethod.PATCH },
        { path: 'product/:id', method: RequestMethod.DELETE },
      );
  }
}
