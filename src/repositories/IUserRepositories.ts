import { User } from '../../src/entities/user.entity';

interface IUsersRepository {
  create(user: User): Promise<User>;
  list(): Promise<User[]>;
}

export { IUsersRepository };
