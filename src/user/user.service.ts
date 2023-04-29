import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUser, IUserList } from './entities/user.interface';
import { UserBodyDTO } from './dto/user.dto';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserServices {
  constructor(private readonly prisma: PrismaService) {}

  async listUser(): Promise<IUserList[]> {
    const users = await this.prisma.client.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return users;
  }

  async createUser(dto: UserBodyDTO): Promise<IUser> {
    const userData: Prisma.ClientCreateInput = {
      id: randomUUID(),
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const createUser = await this.prisma.client.create({
      data: userData,
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      ...createUser,
      password: undefined,
    };
  }
}
