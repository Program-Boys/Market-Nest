import { User } from '../entities/user.entity';
import * as cpf from 'node-cpf';
import { CreateUserService } from '../models/user/CreateUser.service';
import { IUsersRepository } from '../repositories/IUserRepositories';
import { InMemoryUserRepository } from '../repositories/in-memory/user.model';
import { TestingModule, Test } from '@nestjs/testing';
import { CreateUserController } from '../models/user/CreateUser.controller';

describe('Testing Users Services about creation', () => {
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

  it('Should be able to create a new user', async () => {
    const createUserData: User = {
      name: 'John Doe',
      email: 'test@mail.com',
      password: '12345678Gu',
      cpf: cpf.generate(),
    };

    const user = await createUserService.execute(createUserData);

    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create a user', async () => {
    const createUserData: User = {
      name: 'John Doe',
      email: 'test@mail.com',
      password: '12345678Gu',
      cpf: cpf.generate(),
    };

    expect(createUserService.execute(createUserData)).rejects.toEqual(
      new Error('User already exists'),
    );
  });
});
