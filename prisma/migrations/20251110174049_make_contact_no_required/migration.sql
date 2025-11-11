/*
  Warnings:

  - Made the column `address` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contactNo` on table `Customer` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNo" TEXT,
    "contactPerson" TEXT,
    "contactNo" TEXT NOT NULL,
    "email" TEXT,
    "userId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Customer" ("address", "contactNo", "contactPerson", "createdAt", "customerName", "email", "id", "phoneNo", "updatedAt", "userId") SELECT "address", "contactNo", "contactPerson", "createdAt", "customerName", "email", "id", "phoneNo", "updatedAt", "userId" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
