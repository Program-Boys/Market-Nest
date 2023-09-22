import { PrismaUsersRepository } from '../../../src/repositories/prisma/PrismaRepository';
import { CreateUserController } from './CreateUser.controller';
import { CreateUserService } from './CreateUser.service';

export const createUserFactory = () => {
  const usersRepository = new PrismaUsersRepository();
  const createUser = new CreateUserService(usersRepository);
  const createUserController = new CreateUserController(createUser);
  return createUserController;
};
