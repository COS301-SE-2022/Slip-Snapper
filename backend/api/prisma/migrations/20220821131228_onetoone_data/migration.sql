/*
  Warnings:

  - You are about to drop the `_ItemTodataItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ItemTodataItem" DROP CONSTRAINT "_ItemTodataItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItemTodataItem" DROP CONSTRAINT "_ItemTodataItem_B_fkey";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "dataId" INTEGER;

-- DropTable
DROP TABLE "_ItemTodataItem";

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_dataId_fkey" FOREIGN KEY ("dataId") REFERENCES "dataItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
