import z from "zod";

/**
 * organization create validation
 */
export const createOrganizationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address of Company"),
    dial_code: z.string().regex(/^\d{1,3}$/, "Invalid dial code of Company").nonempty('Dial Code is required'),
    phone_number: z.string().regex(/^\d{7,15}$/, "Company Phone number must contain 7–15 digits").nonempty('Company Phone Number is required'),
    ein_number: z.string().optional(),
    street: z.string().nonempty('Street Address is required'),
    suite: z.string().optional(),
    latitude: z.string().nonempty("Latitude is required"),
    longitude: z.string().nonempty('Longitude is required'),
    city: z.string().nonempty("City is required"),
    state: z.string().nonempty("State is required"),
    country: z.string().nonempty("Country is required"),
    zip_code: z.string().nonempty("Zip Code is required"),
    user_first_name: z.string().min(1, "User First Name is required"),
    user_last_name: z.string().min(1, "User Last Name is required"),
    user_email: z.string().email("Invalid email address of user"),
    user_dial_code: z.string().regex(/^\d{1,3}$/, "Invalid dial code of User").optional(),
    user_phone_number: z.string().regex(/^\d{7,15}$/, "User Phone number must contain 7–15 digits").optional(),
    user_fax_number: z.string().optional()
  }),
});

/**
 * organization id validation
 */

export const organizationIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Organization Id is required")
  }),
});

/**
 * signin validation
 */

export const organizationLoginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address of Organization"),
    password: z.string().nonempty("Password is required")
  }),
});

/**
 * Update organization schema
 */

export const updateOrganizationSchema = z.object({
  params: z.object({
    id: z.string().min(1, "User ID is required"),
  }),
  body: z.object({
    // Organization fields
    name: z.string().min(1).optional(),
    email: z.string().email("Invalid email address of Company").optional(),
    dial_code: z
      .string()
      .regex(/^\d{1,3}$/, "Invalid dial code of Company")
      .optional(),
    phone_number: z
      .string()
      .regex(/^\d{7,15}$/, "Company Phone number must contain 7–15 digits")
      .optional(),
    ein_number: z.string().optional(),
    street: z.string().optional(),
    suite: z.string().optional(),
    latitude: z.string().optional(),
    longitude: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    zip_code: z.string().optional(),

    // User fields
    user_first_name: z.string().min(1).optional(),
    user_last_name: z.string().min(1).optional(),
    user_email: z.string().email("Invalid email address of user").optional(),
    user_dial_code: z
      .string()
      .regex(/^\d{1,3}$/, "Invalid dial code of User")
      .optional(),
    user_phone_number: z
      .string()
      .regex(/^\d{7,15}$/, "User Phone number must contain 7–15 digits")
      .optional(),
    user_fax_number: z.string().optional(),
  })
  // Prevent empty update body
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  }),
});