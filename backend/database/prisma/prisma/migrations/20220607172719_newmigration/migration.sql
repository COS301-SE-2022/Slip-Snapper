/*
  Warnings:

  - You are about to drop the column `itemPrices` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `itemQuantities` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `itemPrice` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Slip" DROP CONSTRAINT "Slip_usersId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "itemPrices",
DROP COLUMN "itemQuantities",
ADD COLUMN     "itemPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "itemQuantity" INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "weeklyBudget" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "monthlyBudget" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Slip" ADD CONSTRAINT "Slip_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
