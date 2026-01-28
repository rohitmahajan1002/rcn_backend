import {z} from "zod";

/**
 * Create User Validation
 */
export const createUserSchema = z.object({
  body: z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    dial_code: z.string().optional(),
    phone_number: z.string().optional(),
    fax_number: z.string().optional(),
    notes: z.string().optional(),
  }),
});

/**
 * User ID Param Validation
 */
export const userIdParamSchema = z.object({
  params: z.object({
    id: z.string().min(1, "User ID is required"),
  }),
});

/**
 * Update User Validation
 */
export const updateUserSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    status: z.number().int().optional(),
    notes: z.string().optional(),
  }),
});