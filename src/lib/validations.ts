import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string()
    .min(1, 'Email é obrigatório')
    .refine(
      (val) => {
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Validate CPF format (11 digits with or without formatting)
        const cpfRegex = /^\d{11}$|^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        return emailRegex.test(val) || cpfRegex.test(val.replace(/\D/g, ''));
      },
      'Formato inválido de email ou CPF'
    ),
  password: z.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
  rememberMe: z.boolean().optional()
});

export const passwordSchema = z.object({
  password: z.string()
    .min(8, 'Mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Pelo menos 1 letra maiúscula')
    .regex(/\d/, 'Pelo menos 1 número')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Pelo menos 1 caractere especial'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type PasswordFormData = z.infer<typeof passwordSchema>;