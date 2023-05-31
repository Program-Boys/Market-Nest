import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUser, IUserList } from './entities/user.interface';
import { UserBodyDTO } from './dto/user.dto';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { MP_INCLUDE_USER, MP_SELECT_USER } from '../utils/queries/user.utils';

@Injectable()
export class UserServices {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(dto: UserBodyDTO): Promise<IUser> {
    const userData: Prisma.ClientCreateInput = {
      id: randomUUID(),
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      cart: {
        create: {
          id: randomUUID(),
        },
      },
    };

    const createUser = await this.prisma.client.create({
      data: userData,
      select: MP_SELECT_USER,
    });

    return {
      ...createUser,
      password: undefined,
    };
  }

  async listUsers(): Promise<IUserList[]> {
    const users = await this.prisma.client.findMany({
      include: MP_INCLUDE_USER,
    });

    return users;
  }

  async listUser(id: string): Promise<IUserList> {
    const user = await this.prisma.client.findFirst({
      where: {
        id,
      },
      include: MP_INCLUDE_USER,
    });

    return {
      ...user,
      password: undefined,
    };
  }

  async updateUser(id: string, data: UserBodyDTO): Promise<IUser> {
    const updatedUser = await this.prisma.client.update({
      where: {
        id,
      },
      data,
      select: MP_SELECT_USER,
    });

    return {
      ...updatedUser,
      password: undefined,
      updatedAt: new Date(),
    };
  }

  async deletedUser(id: string): Promise<IUserList> {
    const desactiveUser = await this.prisma.client.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
      select: MP_SELECT_USER,
    });

    return desactiveUser;
  }

  async findByEmail(email: string): Promise<IUser> {
    return await this.prisma.client.findFirst({
      where: { email },
    });
  }

  async associateCartToUser(idUser: string, idCart: string): Promise<void> {
    await this.prisma.client.update({
      where: {
        id: idUser,
      },
      data: {
        cart: {
          connect: { id: idCart },
        },
      },
    });

    return;
  }

  async findUserWithCart(idUser: string) {
    return await this.prisma.client.findFirst({
      where: {
        id: idUser,
      },

      include: { cart: { select: { id: true, cartItems: true } } },
    });
  }
}
