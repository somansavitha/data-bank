-- CreateTable
CREATE TABLE "ProductItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productDetailId" INTEGER NOT NULL,
    "productName" TEXT NOT NULL,
    "modelNo" TEXT NOT NULL,
    "quantity_" INTEGER NOT NULL,
    "serialNumbers" JSONB,
    "warrantyDays" INTEGER,
    "warrantyStartDate" DATETIME,
    "warrantyEndDate" DATETIME,
    CONSTRAINT "ProductItem_productDetailId_fkey" FOREIGN KEY ("productDetailId") REFERENCES "ProductDetail" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
