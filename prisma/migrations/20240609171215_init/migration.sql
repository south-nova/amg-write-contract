-- CreateTable
CREATE TABLE "Contract" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "link" TEXT NOT NULL,
    "payCycle" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "companyName" TEXT NOT NULL,
    "pay" INTEGER NOT NULL,
    "payDate" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Contract_link_key" ON "Contract"("link");
