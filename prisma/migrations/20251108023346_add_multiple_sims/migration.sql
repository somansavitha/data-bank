/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `ProductDetail` table. All the data in the column will be lost.
  - You are about to drop the column `simNumber` on the `ProductDetail` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerId" INTEGER NOT NULL,
    "productType" TEXT NOT NULL,
    "invoiceNo" TEXT NOT NULL,
    "invoiceDate" DATETIME,
    "warrantyDays" INTEGER,
    "sims" JSONB,
    "remarks" TEXT,
    "purchaseOrderNo" TEXT,
    "purchaseOrderDate" DATETIME,
    "warrantyStartDate" DATETIME,
    "warrantyEndDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProductDetail_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProductDetail" ("createdAt", "customerId", "id", "invoiceDate", "invoiceNo", "productType", "purchaseOrderDate", "purchaseOrderNo", "remarks", "updatedAt", "warrantyDays", "warrantyEndDate", "warrantyStartDate") SELECT "createdAt", "customerId", "id", "invoiceDate", "invoiceNo", "productType", "purchaseOrderDate", "purchaseOrderNo", "remarks", "updatedAt", "warrantyDays", "warrantyEndDate", "warrantyStartDate" FROM "ProductDetail";
DROP TABLE "ProductDetail";
ALTER TABLE "new_ProductDetail" RENAME TO "ProductDetail";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
