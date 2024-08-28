import { z } from "zod";

export const restaurantSchema = z.object({
  name: z
    .string()
    .min(2, "Nom kamida 2 ta belgidan iborat bo'lishi kerak")
    .max(50, "Nom 50 ta belgidan oshmasligi kerak"),
  owner_id: z.string(),
  location: z.string().optional(),
  description: z
    .string()
    .min(10, "Tavsif kamida 10 ta belgidan iborat bo'lishi kerak"),
  open_hours: z
    .string()
    .min(5, "Ish vaqti kamida 5 ta belgidan iborat bo'lishi kerak"),
});
