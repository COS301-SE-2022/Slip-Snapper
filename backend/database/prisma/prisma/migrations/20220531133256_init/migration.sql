/*
  Warnings:

  - You are about to drop the `SlipUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SlipUser" DROP CONSTRAINT "SlipUser_slipId_fkey";

-- DropForeignKey
ALTER TABLE "SlipUser" DROP CONSTRAINT "SlipUser_userId_fkey";

-- DropTable
DROP TABLE "SlipUser";
