import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IProduct } from './entities/product.interface';
import { ProductBodyDTO, ProductUpdateBodyDTO } from './dto/product.dto';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { MP_SELECT_PRODUCT } from 'src/utils/queries/product.utils';

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
  
  async updateProduct(id: string, data: ProductUpdateBodyDTO) {

    const updatedProduct = await this.prisma.product.update({
      where: {
        id,
      },
      data,
      select: MP_SELECT_PRODUCT
    })

    return updatedProduct
  }

  async deleteProduct(id: string): Promise<IProduct> {
    const deletedProduct = await this.prisma.product.delete({
      where: {
        id,
      },
    });

    return deletedProduct;
  }

}
