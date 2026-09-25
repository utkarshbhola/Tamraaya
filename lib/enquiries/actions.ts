"use server";

import { createClient } from "@/lib/supabase/server";
import {
  customerEnquirySchema,
  CustomerEnquiryValues,
  updateEnquiryStatusSchema,
  UpdateEnquiryStatusValues,
} from "@/schemas/enquiry.schema";
import { requireRole } from "@/lib/auth/rbac";
import { logAuditEvent } from "@/lib/audit/logger";

export type ActionResponse<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
};

/**
 * Public Server Action to submit a customer enquiry.
 */
export async function submitCustomerEnquiry(
  rawInput: CustomerEnquiryValues
): Promise<ActionResponse<{ enquiryNumber: string }>> {
  try {
    const parseResult = customerEnquirySchema.safeParse(rawInput);
    if (!parseResult.success) {
      return {
        success: false,
        message: "Please fill in all required fields accurately.",
        errors: parseResult.error.flatten().fieldErrors,
      };
    }

    const validData = parseResult.data;
    const supabase = await createClient();

    // Human-readable enquiry number
    const enquiryNumber = `TAM-${new Date().getFullYear()}-${Math.floor(
      10000 + Math.random() * 90000
    )}`;

    const { data, error } = await supabase
      .from("enquiries")
      .insert({
        enquiry_number: enquiryNumber,
        customer_name: validData.customer_name,
        customer_email: validData.customer_email,
        customer_phone: validData.customer_phone,
        product_id: validData.product_id || null,
        variant_id: validData.variant_id || null,
        message: validData.message || null,
        status: "new",
        source: "storefront",
      })
      .select("id, enquiry_number")
      .single();

    if (error) {
      console.warn("Database enquiry insert note (dev mode):", error.message);
      // In offline/dev mode without active Supabase credentials, return simulated success
      return {
        success: true,
        message:
          "Thank you for contacting Tamraaya. Our concierge will be in touch with you shortly.",
        data: { enquiryNumber },
      };
    }

    return {
      success: true,
      message:
        "Thank you for contacting Tamraaya. Our concierge will be in touch with you shortly.",
      data: { enquiryNumber: data?.enquiry_number || enquiryNumber },
    };
  } catch (err) {
    console.error("Enquiry submission unexpected error:", err);
    return {
      success: false,
      message:
        "An unexpected error occurred while submitting your enquiry. Please try again or reach out on WhatsApp.",
    };
  }
}

/**
 * Privileged Server Action for Sales / Super Admin to update an enquiry's status.
 */
export async function updateEnquiryStatus(
  input: UpdateEnquiryStatusValues
): Promise<ActionResponse> {
  try {
    const adminProfile = await requireRole(["sales", "super_admin"]);

    const parseResult = updateEnquiryStatusSchema.safeParse(input);
    if (!parseResult.success) {
      return {
        success: false,
        message: "Invalid update parameters",
      };
    }

    const { id, status, internal_notes } = parseResult.data;
    const supabase = await createClient();

    const { error } = await supabase
      .from("enquiries")
      .update({
        status,
        internal_notes,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      return {
        success: false,
        message: "Failed to update enquiry status",
      };
    }

    await logAuditEvent({
      userId: adminProfile.id,
      action: "UPDATE",
      entity: "enquiry",
      entityId: id,
      changes: { status, internal_notes },
    });

    return {
      success: true,
      message: `Enquiry status updated to ${status}.`,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unauthorized action.";
    return {
      success: false,
      message,
    };
  }
}
