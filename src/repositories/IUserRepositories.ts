import { User } from '../../src/entities/user.entity';

interface IUsersRepository {
  create(user: User): Promise<User>;
  list(users: User[]): Promise<User[]>;
}

export { IUsersRepository };
