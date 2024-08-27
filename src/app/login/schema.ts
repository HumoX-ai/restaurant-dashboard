import { z } from "zod";

export const LoginSchema = z.object({
  phone: z
    .string()
    .min(9, "Telefon raqam formatini to'liq kiriting")
    .max(17, "Telefon raqami noto'g'ri")
    .regex(/^\+998 \d{2} \d{3}-\d{2}-\d{2}$/, "To'g'ri telefon formatini kiriting"),
  password: z.string().min(6, "Parol 6ta belgiladan oshishi kerak").max(50),
});
