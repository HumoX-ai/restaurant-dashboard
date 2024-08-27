import { z } from "zod";

export const RegisterSchema = z.object({
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
  password: z.string().min(6, "Parol 6ta belgiladan oshishi kerak").max(50),
  address: z.string(),
});
