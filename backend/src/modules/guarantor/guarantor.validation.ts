import { z } from "zod";

export const createGuarantorSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required."),
  mobileNumber: z.string().min(1, "Mobile number is required."),
  alternativePhone: z.string().optional(),
  email: z.string().email("Please enter a valid email address.").optional(),
  nrc: z.string().min(1, "NRC is required."),
  occupation: z.string().optional(),
  employer: z.string().optional(),
  monthlyIncome: z.coerce.number().nonnegative().optional(),
  physicalAddress: z.string().optional(),
  city: z.string().optional(),
});

export const updateGuarantorSchema = createGuarantorSchema.partial();

export type CreateGuarantorDto = z.infer<typeof createGuarantorSchema>;
export type UpdateGuarantorDto = z.infer<typeof updateGuarantorSchema>;