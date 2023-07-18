import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUser, IUserList } from './entities/user.interface';
import { UserBodyDTO, UserForgetBodyDTO } from './dto/user.dto';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import {
  MP_SELECT_GET_USER,
  MP_SELECT_USER,
} from '../utils/queries/user.utils';
import validateCpf from './functions/validateCpf';
import { MP_USER_NOT_FOUND } from 'src/utils/return-messages/user-returns.utils';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from 'src/auth/models/UserPayload';

@Injectable()
export class UserServices {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(dto: UserBodyDTO): Promise<IUser> {
    const userData: Prisma.ClientCreateInput = {
      id: randomUUID(),
      ...dto,
      cpf: validateCpf(dto.cpf),
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
      select: MP_SELECT_GET_USER,
    });

    return users;
  }

  async listUser(id: string): Promise<IUserList> {
    const user = await this.prisma.client.findFirst({
      where: {
        id,
      },
      select: MP_SELECT_GET_USER,
    });

    return {
      ...user,
      password: undefined,
    };
  }

  async listUsersNotActive(): Promise<IUserList[]> {
    const users = await this.prisma.client.findMany({
      where: {
        isActive: false,
      },
      select: MP_SELECT_GET_USER,
    });

    return users;
  }

  async listUsersActive(): Promise<IUserList[]> {
    const users = await this.prisma.client.findMany({
      where: {
        isActive: true,
      },
      select: MP_SELECT_GET_USER,
    });

    return users;
  }

  async updateUser(id: string, data: UserBodyDTO): Promise<IUser> {
    const updatedUser = await this.prisma.client.update({
      where: {
        id,
      },
      data,
      select: MP_SELECT_GET_USER,
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
      select: MP_SELECT_GET_USER,
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

  async findUserWithCart(idUser: string): Promise<IUser> {
    return await this.prisma.client.findFirst({
      where: {
        id: idUser,
      },

      include: { cart: { select: { id: true, cartItems: true } } },
    });
  }

  async forgetPassword(email: UserForgetBodyDTO): Promise<string> {
    const findUser = await this.prisma.client.findFirst({
      where: email,
    });

    if (!findUser) throw new HttpException(MP_USER_NOT_FOUND, 400);

    const payload = {
      email: findUser.email,
      id: findUser.id,
    };

    const tokenNewPassword = this.jwtService.sign(payload);

    console.log(' QUERO VER SE GERA =>', tokenNewPassword);

    return '';
  }
}
