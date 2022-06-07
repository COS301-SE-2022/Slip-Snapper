/*
  Warnings:

  - You are about to drop the column `item` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `itemType` on the `Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "item",
DROP COLUMN "itemType",
ADD COLUMN     "dataId" INTEGER;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "monthlyBudget" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "weeklyBudget" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "dataItem" (
    "id" SERIAL NOT NULL,
    "item" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,

    CONSTRAINT "dataItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_dataId_fkey" FOREIGN KEY ("dataId") REFERENCES "dataItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
