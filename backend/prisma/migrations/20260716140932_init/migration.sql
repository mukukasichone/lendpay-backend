-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "customerNo" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "nrc" TEXT NOT NULL,
    "email" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "gender" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING_KYC',
    "creditLimit" DECIMAL(65,30) NOT NULL DEFAULT 500,
    "availableLimit" DECIMAL(65,30) NOT NULL DEFAULT 500,
    "standing" TEXT NOT NULL DEFAULT 'NEW',
    "isVip" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_customerNo_key" ON "Customer"("customerNo");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_mobileNumber_key" ON "Customer"("mobileNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_nrc_key" ON "Customer"("nrc");
