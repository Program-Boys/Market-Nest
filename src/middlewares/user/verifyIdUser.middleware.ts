import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { MP_USER_MID_NOT_FOUND } from 'src/utils/return-messages/user-returns.utils';

@Injectable()
export class VerifyIdMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const findUser = await this.prisma.client.findFirst({
      where: {
        id,
      },
    });

    if (!findUser)
      return res.status(404).json({ messager: MP_USER_MID_NOT_FOUND });

    next();
  }
}
