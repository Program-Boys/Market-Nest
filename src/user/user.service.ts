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
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { Request } from 'express';
import { MailerService } from '@nestjs-modules/mailer';
import { getFullURL } from './functions/getFullURL';
const Mailgen = require('mailgen');

@Injectable()
export class UserServices {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailer: MailerService,
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

  createEmailTemplate(user: IUser, req: Request) {
    const mailGen = new Mailgen({
      theme: 'default',
      product: {
        name: 'Reset password',
        link: 'http://localhost:3000/',
      },
    });

    const url = getFullURL(req).replace('forget-password', 'new-password');

    const email = {
      body: {
        name: user.name,
        intro: 'Reset your password',
        action: {
          instructions:
            'Para que seja possível o reset de senha, por favor, clique no botão abaixo e escreva sua nova senha',
          button: {
            color: '#0099FF',
            text: 'Reset your password',
            link: `${url}?token=${user.resetToken}`,
          },
        },
        outro: 'Need Help? Please, send me a email',
      },
    };

    const mailBody = mailGen.generate(email);

    return mailBody;
  }

  async sendMail(user: IUser, req: Request) {
    const htmlBody = this.createEmailTemplate(user, req);

    await this.mailer.sendMail({
      to: user.email,
      from: 'guisix16@gmail.com',
      subject: 'Reset your password',
      html: htmlBody,
    });
  }

  async forgetPassword(email: UserForgetBodyDTO, req: Request): Promise<void> {
    const findUser = await this.prisma.client.findFirst({
      where: email,
    });

    if (!findUser) throw new HttpException(MP_USER_NOT_FOUND, 404);

    const payload = {
      email: findUser.email,
      id: findUser.id,
    };

    const tokenNewPassword = this.jwtService.sign(payload);

    await this.prisma.client.update({
      where: {
        id: findUser.id,
      },
      data: {
        resetToken: tokenNewPassword,
      },
    });

    await this.sendMail(findUser, req);

    return;
  }

  async newPassword(password: string, token: string): Promise<string> {
    const decoded = this.jwtService.verify(
      token,
      process.env.JWT_SECRET as JwtVerifyOptions,
    );

    console.log(decoded);

    const findUser = await this.prisma.client.findFirst({
      where: {
        id: decoded.id,
      },
    });

    if (!findUser) throw new HttpException(MP_USER_NOT_FOUND, 404);

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.prisma.client.update({
      where: { id: findUser.id },
      data: {
        password: hashedPassword,
        updatedAt: new Date(),
        resetToken: null,
      },
    });

    return 'Password updated with success';
  }
}
