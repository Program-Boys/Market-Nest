import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Body,
  Req,
  Patch,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UserServices } from './user.service';
import { UserBodyDTO, UserUpdateBodyDTO } from './dto/user.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { MP_USER_DISABLED } from 'src/utils/return-messages/user-returns.utils';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserServices) {}

  @IsPublic()
  @Post()
  async createUser(@Res() res: Response, @Body() body: UserBodyDTO) {
    const createUser = await this.userService.createUser(body);

    await this.userService.associateCartToUser(
      createUser.id,
      createUser.cart.id,
    );

    return res.status(201).json(createUser);
  }

  @IsPublic()
  @Get()
  async getUser(@Res() res: Response) {
    const users = await this.userService.listUsers();

    return res.status(200).json(users);
  }

  @Get('/:id')
  async getUserById(@Res() res: Response, @Req() req: Request) {
    const { id } = req.params;

    const user = await this.userService.listUser(id);

    return res.status(200).json(user);
  }

  @Patch('/:id')
  async updateUser(
    @Res() res: Response,
    @Body() body: UserUpdateBodyDTO,
    @Req() req: Request,
  ) {
    const { id } = req.params;

    const userUpdated = await this.userService.updateUser(id, body);

    return res.status(202).json(userUpdated);
  }

  @IsPublic()
  @Delete('/:id')
  async deleteUser(@Res() res: Response, @Req() req: Request) {
    const { id } = req.params;

    const disabledUser = await this.userService.deletedUser(id);

    return res.status(200).json({
      message: MP_USER_DISABLED,
      user: disabledUser,
    });
  }
}
