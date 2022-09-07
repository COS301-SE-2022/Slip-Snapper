-- AlterTable
ALTER TABLE "Reports" ALTER COLUMN "generatedDate" SET DEFAULT E'',
ALTER COLUMN "generatedDate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Slip" ALTER COLUMN "transactionDate" SET DEFAULT E'',
ALTER COLUMN "transactionDate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT NOT NULL DEFAULT E'';
