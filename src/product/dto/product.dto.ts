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

export class ProductBodyDTO {
  @IsNotEmpty({ message: "The name field can't be empty" })
  @MinLength(2, { message: 'The name has to be greater or equal than 2' })
  @MaxLength(120, { message: 'The name length limited to 120 characters' })
  name: string;

  @IsNotEmpty({ message: "Description field can't be empty" })
  @MinLength(10, {
    message: 'Description has to be greater than 10 characters',
  })
  @MaxLength(255, { message: 'Description length limited to 255 characters' })
  description: string;

  @IsNotEmpty({ message: "Price field can't be empty" })
  price: number;

  @IsNotEmpty({ message: "Stock field can't be empty" })
  @IsNumber()
  stock: number;

  @IsNotEmpty({ message: "Image url can't be empty" })
  @IsUrl()
  @Validate(UrlSizeValidator)
  imageUrl: string;
}

export class ProductUpdateBodyDTO {
  @IsOptional()
  @MinLength(2, { message: 'The name has to be greater or equal than 2' })
  name: string;

  @IsOptional()
  @IsNotEmpty({ message: "Description field can't be empty" })
  description: string;

  @IsOptional()
  stock: number;

  @IsOptional()
  price: number;

  @IsOptional()
  @IsUrl()
  @Validate(UrlSizeValidator)
  imageUrl: string;
}
