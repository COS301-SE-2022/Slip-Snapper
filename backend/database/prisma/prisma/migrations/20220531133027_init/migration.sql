/*
  Warnings:

  - You are about to drop the column `userId` on the `Slip` table. All the data in the column will be lost.
  - Made the column `username` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstname` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastname` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_slipId_fkey";

-- DropForeignKey
ALTER TABLE "Slip" DROP CONSTRAINT "Slip_userId_fkey";

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "slipId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Slip" DROP COLUMN "userId",
ADD COLUMN     "usersId" INTEGER;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "username" SET NOT NULL,
ALTER COLUMN "firstname" SET NOT NULL,
ALTER COLUMN "lastname" SET NOT NULL;

-- CreateTable
CREATE TABLE "SlipUser" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "slipId" INTEGER NOT NULL,

    CONSTRAINT "SlipUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SlipUser" ADD CONSTRAINT "SlipUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SlipUser" ADD CONSTRAINT "SlipUser_slipId_fkey" FOREIGN KEY ("slipId") REFERENCES "Slip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slip" ADD CONSTRAINT "Slip_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_slipId_fkey" FOREIGN KEY ("slipId") REFERENCES "Slip"("id") ON DELETE SET NULL ON UPDATE CASCADE;
