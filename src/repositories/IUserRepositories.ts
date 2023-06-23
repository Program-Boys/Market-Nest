import { User } from '../../src/entities/user.entity';

interface IUsersRepository {
  create(user: User): Promise<User>;
  list(users: User[]): Promise<User[]>;
  listById(id: string): Promise<User>;
}

export { IUsersRepository };
