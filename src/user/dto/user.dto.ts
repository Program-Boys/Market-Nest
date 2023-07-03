import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserBodyDTO {
  @ApiProperty({
    example: 'John Doe',
    description:
      'O nome será utilizado sempre para fazer referência a algo relacionado a esse usuário (Perfil, Home Page, etc) e saber que ela está conectada',
  })
  @IsNotEmpty({ message: "The name field can't be empty" })
  name: string;

  @ApiProperty({
    example: 'johndoe@mail.com',
    description:
      'O e-mail é necessário para o registro do usuário como também para o login(uma vez que esse usuário já exista)',
  })
  @IsEmail(undefined, { message: 'Email is not valid' })
  email: string;

  @ApiProperty({
    example: '12345678Joh',
    description:
      'Para fazer o login no nosso sistema é necessário inserir a senha. A senha precisa que tenha no mínimo 8 caracteres(sendo obrigatório usar números, letras minúsculas e maiúsculas, simbólos são opcionais)',
  })
  @IsNotEmpty()
  @MinLength(8, { message: 'The password has to be greater or equal than 8' })
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, {
    message: 'Password to weak',
  })
  password: string;

  @ApiProperty({
    example: '111.111.111-12',
    description:
      'O CPF é necessário para futuramente, caso o usuário fosse fazer alguma compra já termos esse dado de antemão(estamos pensando em tornar esse campo opcional), também pode servir commo um tipo de identificador único',
  })
  @IsNotEmpty({ message: "The CPF field can't be empty" })
  cpf: string;

  @ApiProperty({
    example: true,
    description:
      'Para sabermos se o usuário consta como ativo ou não no nosso sistema',
  })
  isActive: boolean;
}

export class UserUpdateBodyDTO {
  @ApiProperty({
    example: 'John Doe',
    description:
      'O nome será utilizado sempre para fazer referência a algo relacionado a esse usuário (Perfil, Home Page, etc) e saber que ela está conectada',
  })
  @IsOptional()
  @IsNotEmpty({ message: "The name field can't be empty" })
  name: string;

  @ApiProperty({
    example: 'johndoe@mail.com',
    description:
      'O e-mail é necessário para o registro do usuário como também para o login(uma vez que esse usuário já exista)',
  })
  @IsOptional()
  @IsEmail(undefined, { message: 'Email is not valid' })
  email: string;

  @ApiProperty({
    example: '12345678Joh',
    description:
      'Para fazer o login no nosso sistema é necessário inserir a senha. A senha precisa que tenha no mínimo 8 caracteres(sendo obrigatório usar números, letras minúsculas e maiúsculas, simbólos são opcionais)',
  })
  @IsOptional()
  @IsNotEmpty()
  @MinLength(8, { message: 'The password has to be greater or equal than 8' })
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, {
    message: 'Password to weak',
  })
  password: string;

  @ApiProperty({
    example: '111.111.111-12',
    description:
      'O CPF é necessário para futuramente, caso o usuário fosse fazer alguma compra já termos esse dado de antemão(estamos pensando em tornar esse campo opcional), também pode servir commo um tipo de identificador único',
  })
  @IsOptional()
  @IsNotEmpty({ message: "The CPF field can't be empty" })
  cpf: string;

  @ApiProperty({
    example: true,
    description:
      'Para sabermos se o usuário consta como ativo ou não no nosso sistema',
  })
  isActive: boolean;
}
