-- CreateTable
CREATE TABLE "DomainDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerId" INTEGER,
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
    CONSTRAINT "DomainDetail_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
