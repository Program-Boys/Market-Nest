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
    const userCreate = User.create({ name, email, password, cpf });
    const user = await this.usersRepository.create(userCreate);

    return user;
  }
}
