import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes";
import customerRoutes from "./modules/customer/customer.routes";
import loanProductRoutes from "./modules/loanProduct/loanProduct.routes";
import loanRoutes from "./modules/loan/loan.routes";
import repaymentRoutes from "./modules/repayment/repayment.routes";
import guarantorRoutes from "./modules/guarantor/guarantor.routes";
import loanApplicationRoutes from "./modules/loanApplication/loanApplication.routes";
import creditAssessmentRoutes from "./modules/creditAssessment/creditAssessment.routes";
import approvalRoutes from "./modules/approval/approval.routes";
import disbursementRoutes from "./modules/disbursement/disbursement.routes";
import loanTransactionRoutes from "./modules/loanTransaction/loanTransaction.routes";
import collectionActivityRoutes from "./modules/collectionActivity/collectionActivity.routes";
import writeOffRoutes from "./modules/writeOff/writeOff.routes";
import auditLogRoutes from "./modules/auditLog/auditLog.routes";
import overdueRoutes from "./modules/overdue/overdue.routes";
import penaltyRoutes from "./modules/penalty/penalty.routes";
import dashboardRoutes from "./modules/dashboard/dashboard.routes";
import reportsRoutes from "./modules/reports/reports.routes";
import notificationRoutes from "./modules/notification/notification.routes";

import errorMiddleware from "./middleware/error.middleware";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "LendPay API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/loan-products", loanProductRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/repayments", repaymentRoutes);
app.use("/api/guarantors", guarantorRoutes);
app.use("/api/loan-applications", loanApplicationRoutes);
app.use("/api/credit-assessments", creditAssessmentRoutes);
app.use("/api/approvals", approvalRoutes);
app.use("/api/disbursements", disbursementRoutes);
app.use("/api/loan-transactions", loanTransactionRoutes);
app.use("/api/collection-activities",collectionActivityRoutes);
app.use("/api/write-offs",writeOffRoutes);
app.use("/api/audit-logs",auditLogRoutes);
app.use("/api/overdue", overdueRoutes);
app.use("/api/penalties", penaltyRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/notifications", notificationRoutes);

app.use(errorMiddleware);

export default app;