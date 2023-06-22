import { IUsersRepository } from '../repositories/IUserRepositories';
import { User } from '../../src/entities/user.entity';
import { InMemoryUserRepository } from '../repositories/in-memory/user.model';
import * as cpf from 'node-cpf';
import { TestingModule, Test } from '@nestjs/testing';
import { ListUserController } from '../models/user/ListUser.controller';
import { ListUserService } from '../../src/models/user/ListUser.service';
import { CreateUserService } from '../../src/models/user/CreateUser.service';

describe('Testing Users Services List Users', () => {
  let usersRepository: IUsersRepository;
  let listUserService: ListUserService;
  let listUserController: ListUserController;
  let createUserService: CreateUserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListUserController],
      providers: [ListUserService],
    }).compile();

    usersRepository = new InMemoryUserRepository();
    listUserService = new ListUserService(usersRepository);
    createUserService = new CreateUserService(usersRepository);
    listUserController = module.get<ListUserController>(ListUserController);
  });

  it('Should be able to list all users', async () => {
    const createUserData: User = {
      name: 'John Doe',
      email: 'test@mail.com',
      password: '12345678Gu',
      cpf: cpf.generate(),
    };

    await createUserService.execute(createUserData);

    const allUsers = await listUserService.execute();

    expect(allUsers.length).toBeGreaterThan(0);
  });
});
