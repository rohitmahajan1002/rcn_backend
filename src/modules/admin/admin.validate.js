import z from "zod";

/**
 * admin login validation
 */

export const adminLoginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address of Admin"),
    password: z.string().nonempty("Password is required")
  }),
});