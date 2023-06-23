import { User } from '../../../src/entities/user.entity';
import { IUsersRepository } from '../../../src/repositories/IUserRepositories';

export class ListUserService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute() {
    const listUsers = User.list();
    const allUsers = await this.usersRepository.list(listUsers);

    return allUsers;
  }

  async executeById(id: string) {
    const listOneUser = User.listById(id);
    const oneUser = await this.usersRepository.listById(listOneUser.id);

    return oneUser;
  }
}
