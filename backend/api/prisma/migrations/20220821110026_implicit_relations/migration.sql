/*
  Warnings:

  - You are about to drop the `Item_DataItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Slip_Item` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item_DataItem" DROP CONSTRAINT "Item_DataItem_dataItemId_fkey";

-- DropForeignKey
ALTER TABLE "Item_DataItem" DROP CONSTRAINT "Item_DataItem_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Slip_Item" DROP CONSTRAINT "Slip_Item_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Slip_Item" DROP CONSTRAINT "Slip_Item_slipId_fkey";

-- DropTable
DROP TABLE "Item_DataItem";

-- DropTable
DROP TABLE "Slip_Item";

-- CreateTable
CREATE TABLE "_ItemTodataItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ItemToSlip" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ItemTodataItem_AB_unique" ON "_ItemTodataItem"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemTodataItem_B_index" ON "_ItemTodataItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToSlip_AB_unique" ON "_ItemToSlip"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToSlip_B_index" ON "_ItemToSlip"("B");

-- AddForeignKey
ALTER TABLE "_ItemTodataItem" ADD CONSTRAINT "_ItemTodataItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemTodataItem" ADD CONSTRAINT "_ItemTodataItem_B_fkey" FOREIGN KEY ("B") REFERENCES "dataItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToSlip" ADD CONSTRAINT "_ItemToSlip_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToSlip" ADD CONSTRAINT "_ItemToSlip_B_fkey" FOREIGN KEY ("B") REFERENCES "Slip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
