import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { IProduct } from "./entities/product.interface";
import { ProductBodyDTO } from "./dto/product.dto";
import { Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { MP_SELECT_PRODUCT } from "src/utils/queries/product.utils";

@Injectable()
export class ProductServices {
    constructor(private readonly prisma: PrismaService) {}

    async createProduct(dto: ProductBodyDTO): Promise<IProduct> {
        const producData: Prisma.ProductCreateInput = {
            id: randomUUID(),
            ...dto
        }

        const createProduct = await this.prisma.product.create({
            data: producData,
            select: MP_SELECT_PRODUCT
        })

        return createProduct
    }

}