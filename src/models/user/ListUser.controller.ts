import { Request, Response } from 'express';
import { ListUserService } from './ListUser.service';
import { Controller } from '@nestjs/common';

@Controller()
class ListUserController {
  constructor(private listUsers: ListUserService) {}

  async handle(request: Request, response: Response) {
    const users = await this.listUsers.execute();

    return response.json(users);
  }
}

export { ListUserController };
