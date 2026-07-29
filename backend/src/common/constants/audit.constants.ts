export const AuditEntity = {
  USER: "User",
  CUSTOMER: "Customer",
  LOAN_PRODUCT: "LoanProduct",
  LOAN_APPLICATION: "LoanApplication",
  LOAN: "Loan",
  REPAYMENT: "Repayment",
  DISBURSEMENT: "Disbursement",
  WRITE_OFF: "WriteOff",
  COLLECTION_ACTIVITY: "CollectionActivity",
  CREDIT_ASSESSMENT: "CreditAssessment",
} as const;

export const AuditAction = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",

  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",

  APPROVE: "APPROVE",
  REJECT: "REJECT",

  DISBURSE: "DISBURSE",
  REPAY: "REPAY",
  WRITE_OFF: "WRITE_OFF",
  MARK_OVERDUE: "MARK_OVERDUE",
  APPLY_PENALTY: "APPLY_PENALTY",
} as const;
