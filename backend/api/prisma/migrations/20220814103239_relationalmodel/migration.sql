/*
  Warnings:

  - You are about to drop the column `dataId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `slipId` on the `Item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_dataId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_slipId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "dataId",
DROP COLUMN "slipId";

-- AlterTable
ALTER TABLE "Reports" ADD COLUMN     "reportNumber" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "generatedDate" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Slip" ADD COLUMN     "slipNumber" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "Slip_Item" (
    "id" SERIAL NOT NULL,
    "slipId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "Slip_Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item_DataItem" (
    "id" SERIAL NOT NULL,
    "dataItemId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "Item_DataItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Slip_Item" ADD CONSTRAINT "Slip_Item_slipId_fkey" FOREIGN KEY ("slipId") REFERENCES "Slip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slip_Item" ADD CONSTRAINT "Slip_Item_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item_DataItem" ADD CONSTRAINT "Item_DataItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item_DataItem" ADD CONSTRAINT "Item_DataItem_dataItemId_fkey" FOREIGN KEY ("dataItemId") REFERENCES "dataItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
