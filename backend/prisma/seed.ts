import { PrismaClient, UserRole, InterestCalculationMethod, Currency } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // ==========================
  // Branch
  // ==========================
  const branch = await prisma.branch.upsert({
    where: {
      code: "HQ",
    },
    update: {},
    create: {
      code: "HQ",
      name: "Head Office",
      address: "Lusaka",
      phone: "+260000000000",
      email: "info@lendpay.com",
    },
  });

  // ==========================
  // Super Admin
  // ==========================
  const password = await bcrypt.hash("Admin@123", 10);

  await prisma.user.upsert({
    where: {
      email: "admin@lendpay.com",
    },
    update: {},
    create: {
      firstName: "System",
      lastName: "Administrator",
      email: "admin@lendpay.com",
      password,
      role: UserRole.SUPER_ADMIN,
      branchId: branch.id,
    },
  });

  // ==========================
  // Loan Product 1
  // ==========================
  await prisma.loanProduct.upsert({
    where: {
      productCode: "LP001",
    },
    update: {},
    create: {
      productCode: "LP001",
      productName: "Salary Advance",
      description: "Short-term salary advance",
      minAmount: 500,
      maxAmount: 5000,
      interestRate: 20,
      interestCalculationMethod:
        InterestCalculationMethod.SIMPLE_FIXED,
      processingFee: 50,
      penaltyRate: 5,
      gracePeriodDays: 0,
      termDays: 30,
      currency: Currency.ZMW,
      maxLoansPerCustomer: 1,
    },
  });

  // ==========================
  // Loan Product 2
  // ==========================
  await prisma.loanProduct.upsert({
    where: {
      productCode: "LP002",
    },
    update: {},
    create: {
      productCode: "LP002",
      productName: "Business Loan",
      description: "Small business financing",
      minAmount: 1000,
      maxAmount: 50000,
      interestRate: 15,
      interestCalculationMethod:
        InterestCalculationMethod.SIMPLE_FIXED,
      processingFee: 100,
      penaltyRate: 5,
      gracePeriodDays: 5,
      termDays: 90,
      currency: Currency.ZMW,
      maxLoansPerCustomer: 2,
    },
  });

  console.log("✅ Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });