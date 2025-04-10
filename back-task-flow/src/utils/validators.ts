import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z
    .string()
    .refine(
      (val) =>
        val.length >= 8 &&
        /[a-z]/.test(val) &&
        /[A-Z]/.test(val) &&
        /\d/.test(val) &&
        /[@$!%*?&]/.test(val),
      {
        message: "Senha fraca",
      }
    ),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
});

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});
