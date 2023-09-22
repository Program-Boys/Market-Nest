import { User } from '../../../src/entities/user.entity';
import { IUsersRepository } from '../IUserRepositories';
import { randomUUID } from 'crypto';

class InMemoryUserRepository implements IUsersRepository {
  public users: User[] = [];

  async create(user: User): Promise<User> {
    Object.assign(user, {
      id: randomUUID(),
    });
    this.users.push(user);
    return user;
  }

  async list(): Promise<User[]> {
    return this.users;
  }

  async listById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
}

export { InMemoryUserRepository };
