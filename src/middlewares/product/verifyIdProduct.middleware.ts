import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { MP_PRODUCT_MID_NOT_FOUND } from 'src/utils/return-messages/product-returns.utils';

@Injectable()
export class VerifyIdProductMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const findProduct = await this.prisma.product.findFirst({
      where: {
        id,
      },
    });

    if (!findProduct)
      return res.status(404).json({ message: MP_PRODUCT_MID_NOT_FOUND });

    next();
  }
}
