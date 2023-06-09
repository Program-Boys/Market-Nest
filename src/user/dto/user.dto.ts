import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class UserBodyDTO {
  @IsNotEmpty({ message: "The name field can't be empty" })
  name: string;

  @IsEmail(undefined, { message: 'Email is not valid' })
  email: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'The password has to be greater or equal than 8' })
  password: string;

  @IsNotEmpty({ message: "The CPF field can't be empty" })
  cpf: string;
}


export class UserUpdateBodyDTO {
  @IsOptional()
  @IsNotEmpty({ message: "The name field can't be empty" })
  name: string;

  @IsOptional()
  @IsEmail(undefined, { message: 'Email is not valid' })
  email: string;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(8, { message: 'The password has to be greater or equal than 8' })
  password: string;

  @IsOptional()
  @IsNotEmpty({ message: "The CPF field can't be empty" })
  cpf: string;
}
