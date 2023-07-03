import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserBodyDTO } from 'src/user/dto/user.dto';
import { LoginRequestBody } from './models/LoginRequestBody';

@ApiTags('login')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: LoginRequestBody })
  async login(@Request() req: AuthRequest) {
    const test: UserBodyDTO = req.user;
    return this.authService.login(test);
  }
}
