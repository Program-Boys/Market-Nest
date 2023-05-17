-- CreateTable
CREATE TABLE "Cart" (
    "clientId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    PRIMARY KEY ("clientId", "productId"),
    CONSTRAINT "Cart_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Cart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
