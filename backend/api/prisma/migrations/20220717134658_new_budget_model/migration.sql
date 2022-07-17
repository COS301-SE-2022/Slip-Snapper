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

-- CreateTable
CREATE TABLE "Slip" (
    "id" SERIAL NOT NULL,
    "location" TEXT,
    "transactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" DOUBLE PRECISION NOT NULL,
    "usersId" INTEGER,

    CONSTRAINT "Slip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "dataId" INTEGER,
    "itemQuantity" INTEGER NOT NULL,
    "itemPrice" DOUBLE PRECISION NOT NULL,
    "slipId" INTEGER,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dataItem" (
    "id" SERIAL NOT NULL,
    "item" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,

    CONSTRAINT "dataItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Budgets" (
    "id" SERIAL NOT NULL,
    "usersId" INTEGER,
    "weeklyFoodBudget" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "weeklyFashionBudget" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "weeklyElectronicsBudget" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "weeklyHouseholdBudget" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "weeklyOtherBudget" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "monthlyFoodBudget" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "monthlyFashionBudget" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "monthlyElectronicsBudget" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "monthlyHouseholdBudget" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "monthlyOtherBudget" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Budgets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Budgets_usersId_key" ON "Budgets"("usersId");

-- AddForeignKey
ALTER TABLE "Slip" ADD CONSTRAINT "Slip_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_slipId_fkey" FOREIGN KEY ("slipId") REFERENCES "Slip"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_dataId_fkey" FOREIGN KEY ("dataId") REFERENCES "dataItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Budgets" ADD CONSTRAINT "Budgets_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
