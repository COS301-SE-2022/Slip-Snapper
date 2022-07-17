/*
  Warnings:

  - You are about to drop the `dataItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_dataId_fkey";

-- DropTable
DROP TABLE "dataItem";

-- CreateTable
CREATE TABLE "DataItem" (
    "id" SERIAL NOT NULL,
    "item" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,

    CONSTRAINT "DataItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Budgets" (
    "id" SERIAL NOT NULL,
    "usersId" INTEGER,
    "weeklyFoodBudget" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "weeklyFashionBudget" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "weeklyElectronicsBudget" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "weeklyHouseholdBudget" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "weeklyOtherBudget" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "monthlyFoodBudget" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "monthlyFashionBudget" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "monthlyElectronicsBudget" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "monthlyHouseholdBudget" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "monthlyOtherBudget" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Budgets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Budgets_usersId_key" ON "Budgets"("usersId");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_dataId_fkey" FOREIGN KEY ("dataId") REFERENCES "DataItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Budgets" ADD CONSTRAINT "Budgets_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
