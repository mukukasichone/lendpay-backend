-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('ZMW');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'MANAGER', 'CREDIT_MANAGER', 'LOAN_OFFICER', 'COLLECTIONS', 'CASHIER', 'VIEWER');

-- CreateEnum
CREATE TYPE "CustomerStatus" AS ENUM ('PENDING_KYC', 'ACTIVE', 'INACTIVE', 'BLOCKED');

-- CreateEnum
CREATE TYPE "CustomerStanding" AS ENUM ('NEW', 'GOOD', 'AT_RISK', 'DEFAULTED');

-- CreateEnum
CREATE TYPE "InterestCalculationMethod" AS ENUM ('SIMPLE_FIXED', 'REDUCING_BALANCE');

-- CreateEnum
CREATE TYPE "LoanStatus" AS ENUM ('PENDING', 'APPROVED', 'DISBURSED', 'ACTIVE', 'COMPLETED', 'DEFAULTED', 'WRITTEN_OFF', 'REJECTED');

-- CreateEnum
CREATE TYPE "LoanApplicationStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'RECOMMENDED', 'APPROVED', 'REJECTED', 'CANCELLED', 'DISBURSED');

-- CreateEnum
CREATE TYPE "LoanPurpose" AS ENUM ('PERSONAL', 'BUSINESS', 'AGRICULTURE', 'EDUCATION', 'MEDICAL', 'EMERGENCY', 'SALARY_ADVANCE', 'HOME_IMPROVEMENT', 'CONSUMPTION', 'OTHER');

-- CreateEnum
CREATE TYPE "ApplicationDecision" AS ENUM ('PENDING', 'RECOMMEND_APPROVAL', 'RECOMMEND_REJECTION', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "RepaymentMethod" AS ENUM ('CASH', 'MOBILE_MONEY', 'BANK_TRANSFER');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('NRC_FRONT', 'NRC_BACK', 'PASSPORT', 'PASSPORT_PHOTO', 'DRIVERS_LICENSE', 'PAYSLIP', 'BANK_STATEMENT', 'EMPLOYMENT_LETTER', 'UTILITY_BILL', 'OTHER');

-- CreateEnum
CREATE TYPE "GuarantorRelationship" AS ENUM ('SPOUSE', 'PARENT', 'CHILD', 'SIBLING', 'RELATIVE', 'FRIEND', 'COLLEAGUE', 'EMPLOYER', 'OTHER');

-- CreateEnum
CREATE TYPE "GuarantorStatus" AS ENUM ('ACTIVE', 'RELEASED', 'DEFAULTED');

-- CreateEnum
CREATE TYPE "CollectionStage" AS ENUM ('CURRENT', 'REMINDER', 'PROMISE_TO_PAY', 'FIELD_VISIT', 'LEGAL', 'WRITTEN_OFF');

-- CreateEnum
CREATE TYPE "CollectionResult" AS ENUM ('OPEN', 'PAID', 'PROMISE', 'FAILED', 'LEGAL_ACTION');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('SMS', 'EMAIL', 'PUSH', 'WHATSAPP');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('PENDING', 'SENT', 'FAILED');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('DISBURSEMENT', 'REPAYMENT', 'INTEREST', 'PENALTY', 'FEE', 'WAIVER', 'WRITE_OFF', 'ADJUSTMENT');

-- CreateTable
CREATE TABLE "Branch" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLogin" TIMESTAMP(3),
    "branchId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "customerNo" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "alternativePhone" TEXT,
    "email" TEXT,
    "nrc" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "gender" "Gender",
    "occupation" TEXT,
    "employer" TEXT,
    "monthlyIncome" DECIMAL(65,30),
    "physicalAddress" TEXT,
    "city" TEXT,
    "branchId" TEXT,
    "status" "CustomerStatus" NOT NULL DEFAULT 'PENDING_KYC',
    "standing" "CustomerStanding" NOT NULL DEFAULT 'NEW',
    "creditLimit" DECIMAL(65,30) NOT NULL DEFAULT 500,
    "availableLimit" DECIMAL(65,30) NOT NULL DEFAULT 500,
    "totalLoans" INTEGER NOT NULL DEFAULT 0,
    "successfulLoans" INTEGER NOT NULL DEFAULT 0,
    "totalBorrowed" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "totalRepaid" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "isVip" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerDocument" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "uploadedById" TEXT,
    "documentType" "DocumentType" NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanProduct" (
    "id" TEXT NOT NULL,
    "productCode" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "description" TEXT,
    "minAmount" DECIMAL(65,30) NOT NULL,
    "maxAmount" DECIMAL(65,30) NOT NULL,
    "interestRate" DECIMAL(65,30) NOT NULL,
    "interestCalculationMethod" "InterestCalculationMethod" NOT NULL,
    "processingFee" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "penaltyRate" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "gracePeriodDays" INTEGER NOT NULL DEFAULT 0,
    "termDays" INTEGER NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'ZMW',
    "maxLoansPerCustomer" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoanProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guarantor" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "alternativePhone" TEXT,
    "email" TEXT,
    "nrc" TEXT NOT NULL,
    "occupation" TEXT,
    "employer" TEXT,
    "monthlyIncome" DECIMAL(65,30),
    "physicalAddress" TEXT,
    "city" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Guarantor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanApplication" (
    "id" TEXT NOT NULL,
    "applicationNumber" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "loanProductId" TEXT NOT NULL,
    "requestedAmount" DECIMAL(65,30) NOT NULL,
    "requestedTermDays" INTEGER NOT NULL,
    "purpose" "LoanPurpose" NOT NULL,
    "purposeDescription" TEXT,
    "remarks" TEXT,
    "status" "LoanApplicationStatus" NOT NULL DEFAULT 'DRAFT',
    "submittedAt" TIMESTAMP(3),
    "reviewedAt" TIMESTAMP(3),
    "approvedAt" TIMESTAMP(3),
    "rejectedAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "disbursedAt" TIMESTAMP(3),
    "reviewedById" TEXT,
    "approvedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoanApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationGuarantor" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "guarantorId" TEXT NOT NULL,
    "relationship" "GuarantorRelationship" NOT NULL,
    "status" "GuarantorStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApplicationGuarantor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditAssessment" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "assessorId" TEXT NOT NULL,
    "creditScore" INTEGER,
    "affordabilityScore" INTEGER,
    "debtServiceRatio" DECIMAL(65,30),
    "recommendation" "ApplicationDecision" NOT NULL DEFAULT 'PENDING',
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CreditAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Approval" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "approverId" TEXT NOT NULL,
    "decision" "ApplicationDecision" NOT NULL,
    "approvedAmount" DECIMAL(65,30),
    "approvedTermDays" INTEGER,
    "interestRate" DECIMAL(65,30),
    "remarks" TEXT,
    "approvedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Approval_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disbursement" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "disbursedById" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "referenceNumber" TEXT NOT NULL,
    "bankName" TEXT,
    "bankAccountNumber" TEXT,
    "mobileMoneyNumber" TEXT,
    "transactionReference" TEXT,
    "remarks" TEXT,
    "disbursedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Disbursement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanApplicationHistory" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "userId" TEXT,
    "action" TEXT NOT NULL,
    "oldStatus" "LoanApplicationStatus",
    "newStatus" "LoanApplicationStatus",
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoanApplicationHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loan" (
    "id" TEXT NOT NULL,
    "loanNumber" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "loanProductId" TEXT NOT NULL,
    "principalAmount" DECIMAL(65,30) NOT NULL,
    "interestRate" DECIMAL(65,30) NOT NULL,
    "interestCalculationMethod" "InterestCalculationMethod" NOT NULL,
    "processingFee" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "penaltyRate" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "termDays" INTEGER NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'ZMW',
    "totalInterest" DECIMAL(65,30) NOT NULL,
    "totalRepayable" DECIMAL(65,30) NOT NULL,
    "outstandingPrincipal" DECIMAL(65,30) NOT NULL,
    "outstandingInterest" DECIMAL(65,30) NOT NULL,
    "outstandingPenalty" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "approvedAt" TIMESTAMP(3),
    "disbursedAt" TIMESTAMP(3),
    "maturityDate" TIMESTAMP(3),
    "closedAt" TIMESTAMP(3),
    "status" "LoanStatus" NOT NULL DEFAULT 'PENDING',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanInstallment" (
    "id" TEXT NOT NULL,
    "loanId" TEXT NOT NULL,
    "installmentNumber" INTEGER NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "openingBalance" DECIMAL(65,30) NOT NULL,
    "principalDue" DECIMAL(65,30) NOT NULL,
    "interestDue" DECIMAL(65,30) NOT NULL,
    "penaltyDue" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "totalDue" DECIMAL(65,30) NOT NULL,
    "principalPaid" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "interestPaid" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "penaltyPaid" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "totalPaid" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "closingBalance" DECIMAL(65,30) NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoanInstallment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Repayment" (
    "id" TEXT NOT NULL,
    "receiptNumber" TEXT NOT NULL,
    "loanId" TEXT NOT NULL,
    "installmentId" TEXT,
    "amountPaid" DECIMAL(65,30) NOT NULL,
    "principalPaid" DECIMAL(65,30) NOT NULL,
    "interestPaid" DECIMAL(65,30) NOT NULL,
    "penaltyPaid" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "paymentMethod" "RepaymentMethod" NOT NULL,
    "transactionReference" TEXT,
    "receivedById" TEXT,
    "remarks" TEXT,
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Repayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanTransaction" (
    "id" TEXT NOT NULL,
    "loanId" TEXT NOT NULL,
    "transactionType" "TransactionType" NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "principalComponent" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "interestComponent" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "penaltyComponent" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "balanceAfter" DECIMAL(65,30),
    "reference" TEXT,
    "narration" TEXT,
    "createdById" TEXT,
    "transactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoanTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollectionActivity" (
    "id" TEXT NOT NULL,
    "loanId" TEXT NOT NULL,
    "officerId" TEXT,
    "stage" "CollectionStage" NOT NULL,
    "result" "CollectionResult" NOT NULL,
    "amountPromised" DECIMAL(65,30),
    "promisedPaymentDate" TIMESTAMP(3),
    "nextFollowUpDate" TIMESTAMP(3),
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CollectionActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WriteOff" (
    "id" TEXT NOT NULL,
    "loanId" TEXT NOT NULL,
    "approvedById" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "reason" TEXT NOT NULL,
    "writtenOffAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WriteOff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "subject" TEXT,
    "message" TEXT NOT NULL,
    "status" "NotificationStatus" NOT NULL DEFAULT 'PENDING',
    "sentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "oldValues" JSONB,
    "newValues" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemSetting" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Branch_code_key" ON "Branch"("code");

-- CreateIndex
CREATE INDEX "Branch_code_idx" ON "Branch"("code");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "User_branchId_idx" ON "User"("branchId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_customerNo_key" ON "Customer"("customerNo");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_mobileNumber_key" ON "Customer"("mobileNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_nrc_key" ON "Customer"("nrc");

-- CreateIndex
CREATE INDEX "Customer_mobileNumber_idx" ON "Customer"("mobileNumber");

-- CreateIndex
CREATE INDEX "Customer_nrc_idx" ON "Customer"("nrc");

-- CreateIndex
CREATE INDEX "Customer_status_idx" ON "Customer"("status");

-- CreateIndex
CREATE INDEX "CustomerDocument_customerId_idx" ON "CustomerDocument"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "LoanProduct_productCode_key" ON "LoanProduct"("productCode");

-- CreateIndex
CREATE UNIQUE INDEX "LoanProduct_productName_key" ON "LoanProduct"("productName");

-- CreateIndex
CREATE INDEX "LoanProduct_productCode_idx" ON "LoanProduct"("productCode");

-- CreateIndex
CREATE INDEX "LoanProduct_isActive_idx" ON "LoanProduct"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Guarantor_nrc_key" ON "Guarantor"("nrc");

-- CreateIndex
CREATE INDEX "Guarantor_mobileNumber_idx" ON "Guarantor"("mobileNumber");

-- CreateIndex
CREATE INDEX "Guarantor_nrc_idx" ON "Guarantor"("nrc");

-- CreateIndex
CREATE UNIQUE INDEX "LoanApplication_applicationNumber_key" ON "LoanApplication"("applicationNumber");

-- CreateIndex
CREATE INDEX "LoanApplication_customerId_idx" ON "LoanApplication"("customerId");

-- CreateIndex
CREATE INDEX "LoanApplication_loanProductId_idx" ON "LoanApplication"("loanProductId");

-- CreateIndex
CREATE INDEX "LoanApplication_status_idx" ON "LoanApplication"("status");

-- CreateIndex
CREATE INDEX "LoanApplication_applicationNumber_idx" ON "LoanApplication"("applicationNumber");

-- CreateIndex
CREATE INDEX "ApplicationGuarantor_applicationId_idx" ON "ApplicationGuarantor"("applicationId");

-- CreateIndex
CREATE INDEX "ApplicationGuarantor_guarantorId_idx" ON "ApplicationGuarantor"("guarantorId");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationGuarantor_applicationId_guarantorId_key" ON "ApplicationGuarantor"("applicationId", "guarantorId");

-- CreateIndex
CREATE INDEX "CreditAssessment_applicationId_idx" ON "CreditAssessment"("applicationId");

-- CreateIndex
CREATE INDEX "CreditAssessment_assessorId_idx" ON "CreditAssessment"("assessorId");

-- CreateIndex
CREATE INDEX "Approval_applicationId_idx" ON "Approval"("applicationId");

-- CreateIndex
CREATE INDEX "Approval_approverId_idx" ON "Approval"("approverId");

-- CreateIndex
CREATE UNIQUE INDEX "Disbursement_applicationId_key" ON "Disbursement"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "Disbursement_referenceNumber_key" ON "Disbursement"("referenceNumber");

-- CreateIndex
CREATE INDEX "Disbursement_referenceNumber_idx" ON "Disbursement"("referenceNumber");

-- CreateIndex
CREATE INDEX "Disbursement_disbursedById_idx" ON "Disbursement"("disbursedById");

-- CreateIndex
CREATE INDEX "LoanApplicationHistory_applicationId_idx" ON "LoanApplicationHistory"("applicationId");

-- CreateIndex
CREATE INDEX "LoanApplicationHistory_userId_idx" ON "LoanApplicationHistory"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Loan_loanNumber_key" ON "Loan"("loanNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Loan_applicationId_key" ON "Loan"("applicationId");

-- CreateIndex
CREATE INDEX "Loan_loanNumber_idx" ON "Loan"("loanNumber");

-- CreateIndex
CREATE INDEX "Loan_customerId_idx" ON "Loan"("customerId");

-- CreateIndex
CREATE INDEX "Loan_loanProductId_idx" ON "Loan"("loanProductId");

-- CreateIndex
CREATE INDEX "Loan_status_idx" ON "Loan"("status");

-- CreateIndex
CREATE INDEX "LoanInstallment_loanId_idx" ON "LoanInstallment"("loanId");

-- CreateIndex
CREATE INDEX "LoanInstallment_dueDate_idx" ON "LoanInstallment"("dueDate");

-- CreateIndex
CREATE INDEX "LoanInstallment_isPaid_idx" ON "LoanInstallment"("isPaid");

-- CreateIndex
CREATE UNIQUE INDEX "LoanInstallment_loanId_installmentNumber_key" ON "LoanInstallment"("loanId", "installmentNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Repayment_receiptNumber_key" ON "Repayment"("receiptNumber");

-- CreateIndex
CREATE INDEX "Repayment_loanId_idx" ON "Repayment"("loanId");

-- CreateIndex
CREATE INDEX "Repayment_installmentId_idx" ON "Repayment"("installmentId");

-- CreateIndex
CREATE INDEX "Repayment_paymentDate_idx" ON "Repayment"("paymentDate");

-- CreateIndex
CREATE INDEX "Repayment_receiptNumber_idx" ON "Repayment"("receiptNumber");

-- CreateIndex
CREATE INDEX "LoanTransaction_loanId_idx" ON "LoanTransaction"("loanId");

-- CreateIndex
CREATE INDEX "LoanTransaction_transactionType_idx" ON "LoanTransaction"("transactionType");

-- CreateIndex
CREATE INDEX "LoanTransaction_transactionDate_idx" ON "LoanTransaction"("transactionDate");

-- CreateIndex
CREATE INDEX "CollectionActivity_loanId_idx" ON "CollectionActivity"("loanId");

-- CreateIndex
CREATE INDEX "CollectionActivity_stage_idx" ON "CollectionActivity"("stage");

-- CreateIndex
CREATE INDEX "CollectionActivity_nextFollowUpDate_idx" ON "CollectionActivity"("nextFollowUpDate");

-- CreateIndex
CREATE UNIQUE INDEX "WriteOff_loanId_key" ON "WriteOff"("loanId");

-- CreateIndex
CREATE INDEX "WriteOff_approvedById_idx" ON "WriteOff"("approvedById");

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");

-- CreateIndex
CREATE INDEX "Notification_status_idx" ON "Notification"("status");

-- CreateIndex
CREATE INDEX "Notification_type_idx" ON "Notification"("type");

-- CreateIndex
CREATE INDEX "AuditLog_userId_idx" ON "AuditLog"("userId");

-- CreateIndex
CREATE INDEX "AuditLog_entity_idx" ON "AuditLog"("entity");

-- CreateIndex
CREATE INDEX "AuditLog_entityId_idx" ON "AuditLog"("entityId");

-- CreateIndex
CREATE INDEX "AuditLog_action_idx" ON "AuditLog"("action");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "SystemSetting_key_key" ON "SystemSetting"("key");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerDocument" ADD CONSTRAINT "CustomerDocument_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerDocument" ADD CONSTRAINT "CustomerDocument_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanApplication" ADD CONSTRAINT "LoanApplication_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanApplication" ADD CONSTRAINT "LoanApplication_loanProductId_fkey" FOREIGN KEY ("loanProductId") REFERENCES "LoanProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanApplication" ADD CONSTRAINT "LoanApplication_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanApplication" ADD CONSTRAINT "LoanApplication_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationGuarantor" ADD CONSTRAINT "ApplicationGuarantor_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "LoanApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationGuarantor" ADD CONSTRAINT "ApplicationGuarantor_guarantorId_fkey" FOREIGN KEY ("guarantorId") REFERENCES "Guarantor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditAssessment" ADD CONSTRAINT "CreditAssessment_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "LoanApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditAssessment" ADD CONSTRAINT "CreditAssessment_assessorId_fkey" FOREIGN KEY ("assessorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Approval" ADD CONSTRAINT "Approval_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "LoanApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Approval" ADD CONSTRAINT "Approval_approverId_fkey" FOREIGN KEY ("approverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disbursement" ADD CONSTRAINT "Disbursement_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "LoanApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disbursement" ADD CONSTRAINT "Disbursement_disbursedById_fkey" FOREIGN KEY ("disbursedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanApplicationHistory" ADD CONSTRAINT "LoanApplicationHistory_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "LoanApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanApplicationHistory" ADD CONSTRAINT "LoanApplicationHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "LoanApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_loanProductId_fkey" FOREIGN KEY ("loanProductId") REFERENCES "LoanProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanInstallment" ADD CONSTRAINT "LoanInstallment_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repayment" ADD CONSTRAINT "Repayment_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repayment" ADD CONSTRAINT "Repayment_installmentId_fkey" FOREIGN KEY ("installmentId") REFERENCES "LoanInstallment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repayment" ADD CONSTRAINT "Repayment_receivedById_fkey" FOREIGN KEY ("receivedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanTransaction" ADD CONSTRAINT "LoanTransaction_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanTransaction" ADD CONSTRAINT "LoanTransaction_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionActivity" ADD CONSTRAINT "CollectionActivity_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionActivity" ADD CONSTRAINT "CollectionActivity_officerId_fkey" FOREIGN KEY ("officerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WriteOff" ADD CONSTRAINT "WriteOff_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WriteOff" ADD CONSTRAINT "WriteOff_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
