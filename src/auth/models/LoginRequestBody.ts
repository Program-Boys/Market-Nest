import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginRequestBody {
  @ApiProperty({
    example: 'johndoe@mail.com',
    description:
      'É necessário que seja informado um email(válido) para que o login seja feito corretamente',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '12345678Joh',
    description:
      'É necessário que seja informado uma senha(válida) para que o login seja feito corretamente',
  })
  @IsString()
  password: string;
}
