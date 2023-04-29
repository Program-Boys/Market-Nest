import { Controller, Get, Post, Put, Delete, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { UserServices } from './user.service';
import { UserBodyDTO } from './dto/user.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserServices) {}

  @Get()
  async getUser(@Res() res: Response) {
    const users = await this.userService.listUser();

    return res.status(200).json(users);
  }

  @Post()
  async createUser(@Res() res: Response, @Body() body: UserBodyDTO) {
    const createUser = await this.userService.createUser(body);

    return res.status(201).json(createUser);
  }
}
