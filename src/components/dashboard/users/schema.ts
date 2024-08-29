import { z } from "zod";

// Base schema
export const baseSchema = z.object({
  username: z.string().min(2, "username 2ta belgiladan oshishi kerak").max(50),
  name: z
    .string()
    .min(2, "Ism va familiya 2ta belgiladan oshishi kerak")
    .max(50),
  phone: z
    .string()
    .min(9, "Telefon raqam formatini to'liq kiriting")
    .max(17, "Telefon raqami noto'g'ri")
    .regex(/^\+998 \d{2} \d{3}-\d{2}-\d{2}$/),
  role: z.enum(["customer", "restaurant_owner"]),
  address: z.string(),
});

// Create schema (with required password)
export const createSchema = baseSchema.extend({
  password: z.string().min(6, "Parol 6ta belgiladan oshishi kerak").max(50),
});

// Update schema (with optional password)
export const updateSchema = baseSchema.extend({
  password: z
    .string()

    .optional(),
});

// Combined schema
export const usersSchema = z.discriminatedUnion("mode", [
  z.object({ mode: z.literal("create"), ...createSchema.shape }),
  z.object({ mode: z.literal("update"), ...updateSchema.shape }),
]);
