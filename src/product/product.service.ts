import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IProduct } from './entities/product.interface';
import { ProductBodyDTO, ProductUpdateBodyDTO } from './dto/product.dto';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { MP_SELECT_PRODUCT } from 'src/utils/queries/product.utils';
import { IUser } from 'src/user/entities/user.interface';

@Injectable()
export class ProductServices {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(dto: ProductBodyDTO): Promise<IProduct> {
    const producData: Prisma.ProductCreateInput = {
      id: randomUUID(),
      ...dto,
    };

    const createProduct = await this.prisma.product.create({
      data: producData,
      select: MP_SELECT_PRODUCT,
    });

    return createProduct;
  }

  async listProducts(): Promise<IProduct[]> {
    const products = await this.prisma.product.findMany({});

    return products;
  }

  async listProductById(id: string): Promise<IProduct> {
    const product = await this.prisma.product.findFirst({
      where: { id },
    });

    return product;
  }

  async updateProduct(
    id: string,
    data: ProductUpdateBodyDTO,
  ): Promise<IProduct> {
    const updatedProduct = await this.prisma.product.update({
      where: {
        id,
      },
      data,
      select: MP_SELECT_PRODUCT,
    });

    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<IProduct> {
    const deletedProduct = await this.prisma.product.delete({
      where: {
        id,
      },
    });

    return deletedProduct;
  }

  async addingProductInCart(id: string, user: Partial<IUser>): Promise<string> {
    const findUser = await this.prisma.client.findFirst({
      where: {
        id: user.id,
      },
      include: { cart: true },
    });

    if (!findUser) throw new HttpException('ERROR', 400);

    const cartItemData: Prisma.CartItemUncheckedCreateInput = {
      id: randomUUID(),
      cartId: user.cart.id,
      productId: id,
      quantity: 0,
    };

    await this.prisma.cartItem.create({
      data: cartItemData,
    });

    return 'OK';
  }

  //Essa função acima não vai retornar apenas uma string
  //Pensarei nisso mais tarde ou outro dia

  async removingProductFromCart(
    id: string,
    user: Partial<IUser>,
  ): Promise<void> {
    const findUser = await this.prisma.client.findFirst({
      where: {
        id: user.id,
      },
      include: { cart: true },
    });

    if (!findUser) {
      throw new HttpException('User not found', 404);
    }

    const cart = await this.prisma.cart.findFirst({
      where: {
        id: user.cart.id,
      },
      select: {
        id: true,
        cartItems: true,
      },
    });

    const cartItem = cart.cartItems.find((e) => e.productId === id);

    if (!cartItem) {
      throw new HttpException('Product not found', 404);
    }

    await this.prisma.cartItem.delete({
      where: {
        id: cartItem.id,
      },
    });
  }
}
