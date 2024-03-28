import { z } from "zod";

export const userRegisterSchemaZ = z.object({
  nombre: z
    .string({
      required_error: "nombre requerido",
      invalid_type_error: "el nombre tiene que ser caracteres",
    })
    .refine((nombre) => nombre.length >= 1, {
      message: "El nombre no debe ser vacio",
    }),
  apellido: z
    .string({
      required_error: "apellido requerido",
      invalid_type_error: "el apellido tiene que ser caracteres",
    })
    .refine((apellido) => apellido.length >= 1, {
      message: "El apellido no debe ser vacio",
    }),
  email: z
    .string({ required_error: "email requerido" })
    .email({ message: "email invalido" })
    .refine((email) => email.length >= 1, {
      message: "El email no debe ser vacio",
    }),
  clave: z
    .string({ required_error: "clave requerido" })
    .min(6, { message: "clave minima de 6 caracteres" })
    .refine((clave) => clave.length >= 1, {
      message: "El clave no debe ser vacio",
    }),
});

export const userLoginSchemaZ = z.object({
  email: z
    .string({ required_error: "email requerido" })
    .email({ message: "email invalido" })
    .refine((email) => email.length >= 1, {
      message: "El email no debe ser vacio",
    }),
  clave: z
    .string({ required_error: "clave requerido" })
    .min(6, { message: "clave minima de 6 caracteres" })
    .refine((clave) => clave.length >= 1, {
      message: "El clave no debe ser vacio",
    }),
});
