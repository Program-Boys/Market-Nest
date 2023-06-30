import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { ProductServices } from './product.service';
import { Response, Request } from 'express';
import { ProductBodyDTO, ProductUpdateBodyDTO } from './dto/product.dto';
import {
  MP_PRODUCT_DELETED,
  MP_PRODUCT_REMOVED_FROM_CART,
} from 'src/utils/return-messages/product-returns.utils';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
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

  @Patch('/:id')
  async updateProduct(
    @Res() res: Response,
    @Req() req: Request,
    @Body() body: ProductUpdateBodyDTO,
  ) {
    const { id } = req.params;

    const updatedProduct = await this.productService.updateProduct(id, body);

    return res.status(202).json(updatedProduct);
  }

  @Delete('/:id')
  async deleteProduct(@Res() res: Response, @Req() req: Request) {
    const { id } = req.params;

    const deletedProduct = await this.productService.deleteProduct(id);

    return res.status(200).json({
      message: MP_PRODUCT_DELETED,
      product: deletedProduct,
    });
  }

  //Em breve continuarei a partir daqui a inserção de produto no carrinho do cliente.

  //Continuei, agora controller está funcional mas não na versão definitiva.
  @Post('/cartItem/:id')
  async addingProductInCart(
    @Res() res: Response,
    @Req() req: Request,
    @Query('quantity') quantity: number,
  ) {
    const { id } = req.params;
    const { user } = req;

    const addingProduct = await this.productService.addingProductInCart(
      id,
      user,
      quantity,
    );

    return res.status(200).json({
      message: addingProduct,
    });
  }

  @Delete('/cartItem/:id')
  async removingProductFromCart(@Res() res: Response, @Req() req: Request) {
    const { id } = req.params;

    const { user } = req;

    await this.productService.removingProductFromCart(id, user);

    return res.status(200).json({
      message: MP_PRODUCT_REMOVED_FROM_CART,
    });
  }

  @Post('/cartItem/remove-quantity/:id')
  async removingQuantityProductFromCart(
    @Res() res: Response,
    @Req() req: Request,
    @Query('quantity') quantity: number,
  ) {
    const { id } = req.params;
    const { user } = req;

    const removeQuantity =
      await this.productService.removingQuantityProductFromCart(
        id,
        user,
        quantity,
      );

    return res.status(200).json({
      message: removeQuantity,
    });
  }
}
