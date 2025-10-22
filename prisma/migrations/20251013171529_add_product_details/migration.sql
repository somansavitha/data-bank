-- CreateTable
CREATE TABLE "ProductDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerId" INTEGER NOT NULL,
    "productType" TEXT NOT NULL,
    "invoiceNo" TEXT NOT NULL,
    "invoiceDate" DATETIME NOT NULL,
    "warrantyDays" INTEGER,
    "simNumber" TEXT,
    "phoneNumber" TEXT,
    "remarks" TEXT,
    "purchaseOrderNo" TEXT,
    "purchaseOrderDate" DATETIME,
    "warrantyStartDate" DATETIME,
    "warrantyEndDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProductDetail_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
