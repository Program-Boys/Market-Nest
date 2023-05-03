import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUser, IUserList } from './entities/user.interface';
import { UserBodyDTO } from './dto/user.dto';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { MP_SELECT_USER } from '../utils/queries/user.utils';

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
    };

    const createUser = await this.prisma.client.create({
      data: userData,
      select: MP_SELECT_USER
    });

    return {
      ...createUser,
      password: undefined,
    };
  }

  async listUsers(): Promise<IUserList[]> {
    const users = await this.prisma.client.findMany({
      select: MP_SELECT_USER
    });

    return users;
  }

  async listUser(id: string): Promise<IUserList> {
    const user = await this.prisma.client.findFirst({
      where: {
        id
      },
      select: MP_SELECT_USER
    })

    return user
  }
  
  async deletedUser(id: string): Promise<IUserList> {
    const user = await this.prisma.client.delete({
      where: {
        id
      },
      select: MP_SELECT_USER
    })

    return user
  }
}
