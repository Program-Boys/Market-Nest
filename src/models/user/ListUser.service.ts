import { User } from '../../../src/entities/user.entity';
import { IUsersRepository } from '../../../src/repositories/IUserRepositories';

export class ListUserService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute() {
    const listUsers = User.list();
    const allUsers = await this.usersRepository.list(listUsers);

    return allUsers;
  }
}
