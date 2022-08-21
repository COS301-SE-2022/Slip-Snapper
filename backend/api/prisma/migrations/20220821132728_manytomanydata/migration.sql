/*
  Warnings:

  - You are about to drop the column `dataId` on the `Item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_dataId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "dataId";

-- CreateTable
CREATE TABLE "_ItemTodataItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ItemTodataItem_AB_unique" ON "_ItemTodataItem"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemTodataItem_B_index" ON "_ItemTodataItem"("B");

-- AddForeignKey
ALTER TABLE "_ItemTodataItem" ADD CONSTRAINT "_ItemTodataItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemTodataItem" ADD CONSTRAINT "_ItemTodataItem_B_fkey" FOREIGN KEY ("B") REFERENCES "dataItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
