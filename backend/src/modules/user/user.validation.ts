import { z } from "zod";
import { UserRole } from "@prisma/client";

export const createUserSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters."),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters."),

  email: z
    .string()
    .trim()
    .email("Invalid email address."),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[A-Z]/, "Password must contain an uppercase letter.")
    .regex(/[a-z]/, "Password must contain a lowercase letter.")
    .regex(/[0-9]/, "Password must contain a number."),

  role: z.nativeEnum(UserRole),
});

export const updateUserSchema = z.object({
  firstName: z.string().trim().min(2).optional(),

  lastName: z.string().trim().min(2).optional(),

  email: z.string().trim().email().optional(),

  role: z.nativeEnum(UserRole).optional(),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(1),

  newPassword: z
    .string()
    .min(8)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/),
});