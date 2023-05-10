import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { ProductServices } from './product.service';
import { Response, Request } from 'express';
import { ProductBodyDTO } from './dto/product.dto';

@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductServices) {}

  @Post()
  async createProduct(@Res() res: Response, @Body() body: ProductBodyDTO) {
    const createProduct = await this.productService.createProduct(body);

    return res.status(201).json(createProduct);
  }

  @Get()
  async getProducts(@Res() res: Response) {
    const products = await this.productService.listProducts();

    return res.status(200).json(products);
  }

  @Get('/:id')
  async getProductById(@Res() res: Response, @Req() req: Request) {
    const { id } = req.params;

    const productById = await this.productService.listProductById(id);

    return res.status(200).json(productById);
  }
}
