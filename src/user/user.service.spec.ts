import { Test, TestingModule } from '@nestjs/testing';
import * as cpf from 'node-cpf';

describe('Testing Users Services', () => {
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({}).compile();
  });

  it('Should create a new user', async () => {
    const createUserData = {
      id: '1',
      name: 'John Doe',
      email: 'test@mail.com',
      password: '12345678Gu',
      cpf: cpf.generate(),
      createdAt: new Date(),
    };
  });
});
