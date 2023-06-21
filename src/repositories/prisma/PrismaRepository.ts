import { prisma } from '../../../prisma/client/client';
import { User } from '../../../src/entities/user.entity';
import { IUsersRepository } from '../IUserRepositories';
import { randomUUID } from 'crypto';

class PrismaUsersRepository implements IUsersRepository {
  async create({ name, email, password, cpf }): Promise<User> {
    const user = await prisma.client.create({
      data: {
        id: randomUUID(),
        name,
        email,
        password,
        cpf,
      },
    });

    return user;
  }

  async list(): Promise<User[]> {
    const users = await prisma.client.findMany({});

    return users;
  }
}

export { PrismaUsersRepository };
