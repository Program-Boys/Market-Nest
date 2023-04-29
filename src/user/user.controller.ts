import { Controller, Get, Post, Put, Delete, Res, Body, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { UserServices } from './user.service';
import { UserBodyDTO } from './dto/user.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserServices) {}
  
  @Post()
  async createUser(@Res() res: Response, @Body() body: UserBodyDTO) {
    const createUser = await this.userService.createUser(body);
    
    return res.status(201).json(createUser);
  }
  
  @Get()
  async getUser(@Res() res: Response) {
    const users = await this.userService.listUsers();

    return res.status(200).json(users);
  }

  @Get('/:id')
  async getUserById(@Res() res: Response, @Req() req: Request) {
    const { id } = req.params

    const user = await this.userService.listUser(id)

    return res.status(200).json(user)
  }
}
