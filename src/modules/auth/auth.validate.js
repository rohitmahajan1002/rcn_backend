import {z} from "zod";

/**
 * Login validation
 */
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().nonempty("Password is required"),
  }),
});

/**
 * refresh token validation
 */
export const refreshTokenSchema = z.object({
  body: z.object({
    refresh_token: z.string().nonempty("Refresh Token is required"),
  }),
});