import { z } from "zod";

// Shipping form validation schema
export const shippingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Nome deve ter pelo menos 3 caracteres" })
    .max(100, { message: "Nome deve ter no máximo 100 caracteres" }),
  email: z
    .string()
    .trim()
    .email({ message: "Digite um e-mail válido" })
    .max(255, { message: "E-mail deve ter no máximo 255 caracteres" }),
  phone: z
    .string()
    .trim()
    .min(10, { message: "Telefone deve ter pelo menos 10 dígitos" })
    .max(15, { message: "Telefone deve ter no máximo 15 dígitos" })
    .regex(/^[\d\s\-\(\)]+$/, { message: "Telefone deve conter apenas números" }),
  cep: z
    .string()
    .trim()
    .regex(/^\d{5}-?\d{3}$/, { message: "CEP deve estar no formato 00000-000" }),
  address: z
    .string()
    .trim()
    .min(5, { message: "Endereço deve ter pelo menos 5 caracteres" })
    .max(200, { message: "Endereço deve ter no máximo 200 caracteres" }),
  number: z
    .string()
    .trim()
    .min(1, { message: "Número é obrigatório" })
    .max(10, { message: "Número deve ter no máximo 10 caracteres" }),
  complement: z
    .string()
    .trim()
    .max(100, { message: "Complemento deve ter no máximo 100 caracteres" })
    .optional()
    .or(z.literal("")),
  neighborhood: z
    .string()
    .trim()
    .min(2, { message: "Bairro deve ter pelo menos 2 caracteres" })
    .max(100, { message: "Bairro deve ter no máximo 100 caracteres" }),
  city: z
    .string()
    .trim()
    .min(2, { message: "Cidade deve ter pelo menos 2 caracteres" })
    .max(100, { message: "Cidade deve ter no máximo 100 caracteres" }),
  state: z
    .string()
    .trim()
    .length(2, { message: "UF deve ter 2 letras" })
    .regex(/^[A-Z]{2}$/, { message: "UF deve conter apenas letras maiúsculas" }),
});

// Payment form validation schema
export const paymentSchema = z.object({
  cardNumber: z
    .string()
    .trim()
    .regex(/^[\d\s]{16,19}$/, { message: "Número do cartão inválido" }),
  cardName: z
    .string()
    .trim()
    .min(3, { message: "Nome deve ter pelo menos 3 caracteres" })
    .max(100, { message: "Nome deve ter no máximo 100 caracteres" }),
  expiry: z
    .string()
    .trim()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Validade deve estar no formato MM/AA" }),
  cvv: z
    .string()
    .trim()
    .regex(/^\d{3,4}$/, { message: "CVV deve ter 3 ou 4 dígitos" }),
});

export type ShippingFormData = z.infer<typeof shippingSchema>;
export type PaymentFormData = z.infer<typeof paymentSchema>;

// Helper function to format validation errors
export const getFieldError = (
  errors: Record<string, string[] | undefined>,
  field: string
): string | undefined => {
  return errors[field]?.[0];
};
