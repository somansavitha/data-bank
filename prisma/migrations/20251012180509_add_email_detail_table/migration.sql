-- CreateTable
CREATE TABLE "EmailDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imap" TEXT,
    "loginId" TEXT NOT NULL,
    "serviceProvider" TEXT NOT NULL,
    "password" TEXT,
    "customerId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EmailDetail_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
