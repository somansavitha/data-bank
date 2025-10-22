-- CreateTable
CREATE TABLE "WebsiteDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "adminPanelUrl" TEXT,
    "websiteLink" TEXT,
    "username" TEXT,
    "password" TEXT,
    "serverDetails" TEXT,
    "serverUser" TEXT,
    "serverPassword" TEXT,
    "customerId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "WebsiteDetail_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
