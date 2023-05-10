import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { ProductController } from "./product.controller";
import { ProductServices } from "./product.service";

@Module({
    imports: [PrismaModule],
    controllers: [ProductController],
    providers: [ProductServices],
})

export class ProductModule {  }