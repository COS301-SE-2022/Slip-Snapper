/*
  Warnings:

  - You are about to drop the `Budgets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Budgets" DROP CONSTRAINT "Budgets_usersId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "budgets" JSON;

-- DropTable
DROP TABLE "Budgets";
