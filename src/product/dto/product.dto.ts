import { IsNotEmpty, IsOptional, MinLength, minLength } from 'class-validator';

export class ProductBodyDTO {
    @IsNotEmpty({ message: "The name field can't be empty" })
    name: string;
  
    @IsNotEmpty({ message: "Description field can't be empty" })
    description: string
  
    @IsNotEmpty({message: "Price field can't be empty"})
    price: number
  
    @IsNotEmpty({message: "Stock field can't be empty"})
    stock: number
  }
  
  export class ProductUpdateBodyDTO {
    @IsOptional()
    @MinLength(2, { message: 'The name has to be greater or equal than 2' })
    name: string;
  
    @IsOptional()
    @IsNotEmpty({ message: "Description field can't be empty" })
    description: string;
  
    @IsOptional()
    @MinLength(1, { message: 'The stock has to be greater or equal than 1' })
    stock: number;
  
    @IsOptional()
    price: number;
  }