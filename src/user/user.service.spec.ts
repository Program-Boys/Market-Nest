import { User } from '../../src/entities/user.entity';
import * as cpf from 'node-cpf';
import { CreateUserService } from '../../src/models/user/CreateUser.service';
import { IUsersRepository } from '../../src/repositories/IUserRepositories';
import { InMemoryUserRepository } from '../../src/repositories/in-memory/user.model';
import { TestingModule, Test } from '@nestjs/testing';
import { CreateUserController } from '../../src/models/user/CreateUser.controller';

describe('Testing Users Services', () => {
  let usersRepository: IUsersRepository;
  let createUserService: CreateUserService;
  let createUserController: CreateUserController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [CreateUserService],
    }).compile();

    usersRepository = new InMemoryUserRepository();
    createUserService = new CreateUserService(usersRepository);
    createUserController =
      module.get<CreateUserController>(CreateUserController);
  });

  it('Should create a new user', async () => {
    const createUserData: User = {
      name: 'John Doe',
      email: 'test@mail.com',
      password: '12345678Gu',
      cpf: cpf.generate(),
    };

    const user = await createUserService.execute(createUserData);

    expect(user).toHaveProperty('id');
  });
});
