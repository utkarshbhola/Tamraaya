import { z } from "zod";

export const customerEnquirySchema = z.object({
  customer_name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  customer_email: z.string().email("Please provide a valid email address"),
  customer_phone: z
    .string()
    .min(8, "Phone number must be at least 8 digits")
    .max(20, "Phone number is too long")
    .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),
  product_id: z.string().uuid().nullable().optional(),
  variant_id: z.string().uuid().nullable().optional(),
  message: z.string().max(1000, "Message cannot exceed 1000 characters").optional().default(""),
});

export const updateEnquiryStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "contacted", "qualified", "converted", "closed"]),
  internal_notes: z.string().max(2000).nullable().optional(),
});

export type CustomerEnquiryValues = z.infer<typeof customerEnquirySchema>;
export type UpdateEnquiryStatusValues = z.infer<typeof updateEnquiryStatusSchema>;
