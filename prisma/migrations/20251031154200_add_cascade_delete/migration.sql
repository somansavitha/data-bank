/*
  Warnings:

  - Made the column `customerId` on table `DomainDetail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `customerId` on table `EmailDetail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `customerId` on table `WebsiteDetail` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DomainDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerId" INTEGER NOT NULL,
    "domainName" TEXT NOT NULL,
    "websiteUrl" TEXT,
    "registrar" TEXT,
    "loginUrl" TEXT,
    "username" TEXT,
    "password" TEXT,
    "pin" TEXT,
    "activationDate" DATETIME,
    "expiryDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DomainDetail_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_DomainDetail" ("activationDate", "createdAt", "customerId", "domainName", "expiryDate", "id", "loginUrl", "password", "pin", "registrar", "updatedAt", "username", "websiteUrl") SELECT "activationDate", "createdAt", "customerId", "domainName", "expiryDate", "id", "loginUrl", "password", "pin", "registrar", "updatedAt", "username", "websiteUrl" FROM "DomainDetail";
DROP TABLE "DomainDetail";
ALTER TABLE "new_DomainDetail" RENAME TO "DomainDetail";
CREATE TABLE "new_EmailDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imap" TEXT,
    "loginId" TEXT NOT NULL,
    "serviceProvider" TEXT NOT NULL,
    "password" TEXT,
    "customerId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EmailDetail_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_EmailDetail" ("createdAt", "customerId", "id", "imap", "loginId", "password", "serviceProvider", "updatedAt") SELECT "createdAt", "customerId", "id", "imap", "loginId", "password", "serviceProvider", "updatedAt" FROM "EmailDetail";
DROP TABLE "EmailDetail";
ALTER TABLE "new_EmailDetail" RENAME TO "EmailDetail";
CREATE TABLE "new_ProductDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerId" INTEGER NOT NULL,
    "productType" TEXT NOT NULL,
    "invoiceNo" TEXT NOT NULL,
    "invoiceDate" DATETIME,
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
    CONSTRAINT "ProductDetail_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProductDetail" ("createdAt", "customerId", "id", "invoiceDate", "invoiceNo", "phoneNumber", "productType", "purchaseOrderDate", "purchaseOrderNo", "remarks", "simNumber", "updatedAt", "warrantyDays", "warrantyEndDate", "warrantyStartDate") SELECT "createdAt", "customerId", "id", "invoiceDate", "invoiceNo", "phoneNumber", "productType", "purchaseOrderDate", "purchaseOrderNo", "remarks", "simNumber", "updatedAt", "warrantyDays", "warrantyEndDate", "warrantyStartDate" FROM "ProductDetail";
DROP TABLE "ProductDetail";
ALTER TABLE "new_ProductDetail" RENAME TO "ProductDetail";
CREATE TABLE "new_ProductItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productDetailId" INTEGER NOT NULL,
    "productName" TEXT NOT NULL,
    "modelNo" TEXT NOT NULL,
    "quantity_" INTEGER NOT NULL,
    "serialNumbers" JSONB,
    "warrantyDays" INTEGER,
    "warrantyStartDate" DATETIME,
    "warrantyEndDate" DATETIME,
    CONSTRAINT "ProductItem_productDetailId_fkey" FOREIGN KEY ("productDetailId") REFERENCES "ProductDetail" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProductItem" ("id", "modelNo", "productDetailId", "productName", "quantity_", "serialNumbers", "warrantyDays", "warrantyEndDate", "warrantyStartDate") SELECT "id", "modelNo", "productDetailId", "productName", "quantity_", "serialNumbers", "warrantyDays", "warrantyEndDate", "warrantyStartDate" FROM "ProductItem";
DROP TABLE "ProductItem";
ALTER TABLE "new_ProductItem" RENAME TO "ProductItem";
CREATE TABLE "new_ServiceDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerId" INTEGER NOT NULL,
    "serviceType" TEXT NOT NULL,
    "invoiceNo" TEXT NOT NULL,
    "invoiceDate" DATETIME NOT NULL,
    "warrantyDays" INTEGER,
    "remarks" TEXT,
    "purchaseOrderNo" TEXT,
    "purchaseOrderDate" DATETIME,
    "warrantyStartDate" DATETIME,
    "warrantyEndDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ServiceDetail_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ServiceDetail" ("createdAt", "customerId", "id", "invoiceDate", "invoiceNo", "purchaseOrderDate", "purchaseOrderNo", "remarks", "serviceType", "updatedAt", "warrantyDays", "warrantyEndDate", "warrantyStartDate") SELECT "createdAt", "customerId", "id", "invoiceDate", "invoiceNo", "purchaseOrderDate", "purchaseOrderNo", "remarks", "serviceType", "updatedAt", "warrantyDays", "warrantyEndDate", "warrantyStartDate" FROM "ServiceDetail";
DROP TABLE "ServiceDetail";
ALTER TABLE "new_ServiceDetail" RENAME TO "ServiceDetail";
CREATE TABLE "new_WebsiteDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "adminPanelUrl" TEXT,
    "websiteLink" TEXT,
    "username" TEXT,
    "password" TEXT,
    "serverDetails" TEXT,
    "serverUser" TEXT,
    "serverPassword" TEXT,
    "customerId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "WebsiteDetail_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_WebsiteDetail" ("adminPanelUrl", "createdAt", "customerId", "id", "password", "serverDetails", "serverPassword", "serverUser", "updatedAt", "username", "websiteLink") SELECT "adminPanelUrl", "createdAt", "customerId", "id", "password", "serverDetails", "serverPassword", "serverUser", "updatedAt", "username", "websiteLink" FROM "WebsiteDetail";
DROP TABLE "WebsiteDetail";
ALTER TABLE "new_WebsiteDetail" RENAME TO "WebsiteDetail";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
