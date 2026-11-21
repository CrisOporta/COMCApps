import { z } from 'zod';

export const contactSchema = z.object({
  fullName: z.string().trim().min(3, 'Ingresa tu nombre completo (mínimo 3 caracteres).'),
  email: z.string().trim().email('Ingresa un correo electrónico válido.'),
  company: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  service: z.string().trim().min(2, 'Selecciona un área o tipo de proyecto.'),
  budget: z.string().trim().min(1, 'Selecciona un presupuesto estimado.'),
  message: z
    .string()
    .trim()
    .min(15, 'Cuéntanos un poco más sobre tu proyecto (mínimo 15 caracteres).'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
