import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUrl,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { UrlSizeValidator } from './product-validator.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ProductBodyDTO {
  @ApiProperty({
    example: 'Maçã verde',
    description:
      'Nome(produto) no qual será mostrado na tela principal da aplicação',
  })
  @IsNotEmpty({ message: "The name field can't be empty" })
  @MinLength(2, { message: 'The name has to be greater or equal than 2' })
  @MaxLength(120, { message: 'The name length limited to 120 characters' })
  name: string;

  @ApiProperty({
    example: 'Maçã verde maravilhosa',
    description:
      'Descrição na qual acompanhará o produto quando o cliente entrar na página respectiva do mesmo',
  })
  @IsNotEmpty({ message: "Description field can't be empty" })
  @MinLength(10, {
    message: 'Description has to be greater than 10 characters',
  })
  @MaxLength(255, { message: 'Description length limited to 255 characters' })
  description: string;

  @ApiProperty({
    example: 10,
    description:
      'Preço do produto que mostrará basicamente em boa parte da aplicação para o cliente sempre saber o preço do produto que ele está observando(ou adicionando ao carrinho)',
  })
  @IsNotEmpty({ message: "Price field can't be empty" })
  price: number;

  @ApiProperty({
    example: 20,
    description:
      'Basicamente estipula quanto desse item(produto) em questão tem no estoque',
  })
  @IsNotEmpty({ message: "Stock field can't be empty" })
  @IsNumber()
  stock: number;

  @ApiProperty({
    example: 'http://algumaimagemqualquer.png',
    description:
      'Imagem na qual irá acompanhar o produto desde o momento de sua criação, a API espera um link para a imagem diretamente(OBS: A imagem não pode ser maior que 10MB)',
  })
  @IsNotEmpty({ message: "Image url can't be empty" })
  @IsUrl()
  @Validate(UrlSizeValidator)
  imageUrl: string;
}

export class ProductUpdateBodyDTO {
  @ApiProperty({
    example: 'Maçã verde',
    description:
      'Nome(produto) no qual será mostrado na tela principal da aplicação',
  })
  @IsOptional()
  @MinLength(2, { message: 'The name has to be greater or equal than 2' })
  name: string;

  @ApiProperty({
    example: 'Maçã verde maravilhosa',
    description:
      'Descrição na qual acompanhará o produto quando o cliente entrar na página respectiva do mesmo',
  })
  @IsOptional()
  @IsNotEmpty({ message: "Description field can't be empty" })
  description: string;

  @ApiProperty({
    example: 20,
    description:
      'Basicamente estipula quanto desse item(produto) em questão tem no estoque',
  })
  @IsOptional()
  stock: number;

  @ApiProperty({
    example: 10,
    description:
      'Preço do produto que mostrará basicamente em boa parte da aplicação para o cliente sempre saber o preço do produto que ele está observando(ou adicionando ao carrinho)',
  })
  @IsOptional()
  price: number;

  @ApiProperty({
    example: 'http://algumaimagemqualquer.png',
    description:
      'Imagem na qual irá acompanhar o produto desde o momento de sua criação, a API espera um link para a imagem diretamente(OBS: A imagem não pode ser maior que 10MB)',
  })
  @IsOptional()
  @IsUrl()
  @Validate(UrlSizeValidator)
  imageUrl: string;
}
