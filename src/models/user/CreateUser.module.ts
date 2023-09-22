import { Module } from '@nestjs/common';
import { CreateUserController } from './CreateUser.controller';
import { CreateUserService } from './CreateUser.service';

@Module({
  controllers: [CreateUserController],
  providers: [CreateUserService],
  exports: [CreateUserService],
})
export class CreateUserModule {}
