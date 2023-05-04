import { IsNotEmpty, MinLength } from 'class-validator';

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
  