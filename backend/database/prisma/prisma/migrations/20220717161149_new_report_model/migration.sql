/*
  Warnings:

  - You are about to drop the `DataItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_dataId_fkey";

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "itemQuantity" DROP DEFAULT;

-- DropTable
DROP TABLE "DataItem";

-- CreateTable
CREATE TABLE "dataItem" (
    "id" SERIAL NOT NULL,
    "item" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,

    CONSTRAINT "dataItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reports" (
    "id" SERIAL NOT NULL,
    "usersId" INTEGER,
    "reportName" VARCHAR(255) NOT NULL,
    "generatedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reports_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_dataId_fkey" FOREIGN KEY ("dataId") REFERENCES "dataItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
