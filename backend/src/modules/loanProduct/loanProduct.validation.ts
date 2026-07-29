import { z } from "zod";

export const createLoanProductSchema = z
  .object({
    productCode: z
      .string()
      .trim()
      .min(2, "Product code must be at least 2 characters.")
      .max(20, "Product code must not exceed 20 characters."),

    productName: z
      .string()
      .trim()
      .min(3, "Product name must be at least 3 characters.")
      .max(100, "Product name must not exceed 100 characters."),

    description: z
      .string()
      .trim()
      .max(500, "Description must not exceed 500 characters.")
      .optional(),

    minAmount: z
      .number()
      .positive("Minimum amount must be greater than 0."),

    maxAmount: z
      .number()
      .positive("Maximum amount must be greater than 0."),

    interestRate: z
      .number()
      .min(0, "Interest rate cannot be negative."),
    interestCalculationMethod: z
      .enum(["SIMPLE_FIXED", "REDUCING_BALANCE"])
      .optional()
      .default("SIMPLE_FIXED"),
      
    processingFee: z
      .number()
      .min(0, "Processing fee cannot be negative.")
      .optional()
      .default(0),

    penaltyRate: z
      .number()
      .min(0, "Penalty rate cannot be negative.")
      .optional()
      .default(0),

    termDays: z
      .number()
      .int("Term days must be a whole number.")
      .positive("Term days must be greater than 0."),

    currency: z
      .enum(["ZMW"])
      .optional()
      .default("ZMW"),

    maxLoansPerCustomer: z
      .number()
      .int("Maximum loans per customer must be a whole number.")
      .min(1, "Maximum loans per customer must be at least 1.")
      .optional()
      .default(1),

    isActive: z
      .boolean()
      .optional()
      .default(true),
  })
  .refine((data) => data.maxAmount > data.minAmount, {
    message: "Maximum amount must be greater than minimum amount.",
    path: ["maxAmount"],
  });