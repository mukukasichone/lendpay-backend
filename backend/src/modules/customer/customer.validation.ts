import { z } from "zod";

export const createCustomerSchema = z.object({
  customerNo: z
    .string()
    .trim()
    .min(1, "customerNo is required")
    .min(3, "customerNo must be at least 3 characters")
    .max(20, "customerNo must not exceed 20 characters"),
  firstName: z
    .string()
    .trim()
    .min(1, "firstName is required")
    .min(2, "firstName must be at least 2 characters")
    .max(50, "firstName must not exceed 50 characters"),
  lastName: z
    .string()
    .trim()
    .min(1, "lastName is required")
    .min(2, "lastName must be at least 2 characters")
    .max(50, "lastName must not exceed 50 characters"),
  mobileNumber: z
    .string()
    .trim()
    .min(1, "mobileNumber is required")
    .regex(/^\d+$/, "mobileNumber must contain only digits")
    .min(10, "mobileNumber must be at least 10 digits")
    .max(15, "mobileNumber must not exceed 15 digits"),
  nrc: z
    .string()
    .trim()
    .min(1, "nrc is required")
    .min(5, "nrc must be at least 5 characters")
    .max(20, "nrc must not exceed 20 characters"),
  email: z
    .string()
    .trim()
    .email("email must be a valid email address")
    .optional()
    .or(z.literal("")),
  dateOfBirth: z.coerce.date().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;