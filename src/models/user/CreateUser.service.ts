import { User } from '../../../src/entities/user.entity';
import { IUsersRepository } from '../../../src/repositories/IUserRepositories';

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
}

export class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ name, email, password, cpf }: IUserRequest) {
    const allUsers = User.list();

    const findSomeUser = allUsers.find(
      (user) => user.email === email || user.cpf === cpf,
    );

    if (findSomeUser) throw new Error('User already exists');

    const userCreate = User.create({ name, email, password, cpf });
    const user = await this.usersRepository.create(userCreate);

    return user;
  }
}
