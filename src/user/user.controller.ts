import {
  Controller,
  Get,
  Post,
  Delete,
  Res,
  Body,
  Req,
  Patch,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UserServices } from './user.service';
import {
  UserBodyDTO,
  UserForgetBodyDTO,
  UserUpdateBodyDTO,
} from './dto/user.dto';
import { IsPublic } from '../../src/auth/decorators/is-public.decorator';
import { MP_USER_DISABLED } from 'src/utils/return-messages/user-returns.utils';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('clients')
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

  @Get('/not-active')
  async getUsersNotActive(@Res() res: Response) {
    const users = await this.userService.listUsersNotActive();

    return res.status(200).json(users);
  }

  @Get('/active')
  async getUsersActive(@Res() res: Response) {
    const users = await this.userService.listUsersActive();

    return res.status(200).json(users);
  }

  @IsPublic()
  @Post('forget-password')
  async forgetPassword(
    @Body() body: UserForgetBodyDTO,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const forgetPassword = await this.userService.forgetPassword(body, req);

    return res.status(200).json(forgetPassword);
  }

  @IsPublic()
  @Post('new-password/:token')
  async newPassword(@Res() res: Response, @Req() req: Request) {
    const { token } = req.params;
    const { password } = req.body;

    const newPassword = await this.userService.newPassword(password, token);

    return res.status(200).json(newPassword);
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
