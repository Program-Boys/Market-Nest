import { Body, Controller, Post, Res } from "@nestjs/common";
import { ProductServices } from "./product.service";
import { Response, Request } from 'express';
import { ProductBodyDTO } from "./dto/product.dto";

@Controller('/product')
export class ProductController {
    constructor(private readonly productService: ProductServices) {}

    @Post()
    async createProduct(@Res() res: Response, @Body() body: ProductBodyDTO) {
        const createProduct = await this.productService.createProduct(body)

        return res.status(201).json(createProduct)
    }
}