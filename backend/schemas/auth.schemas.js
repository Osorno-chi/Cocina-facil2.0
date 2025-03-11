const { z } = require("zod");

// Esquema para el registro de usuarios
const registerSchema = z.object({
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
    .max(20, "El nombre de usuario no puede superar los 20 caracteres")
    .regex(/^[a-zA-Z0-9_]+$/, "El nombre de usuario solo puede contener letras, números y guiones bajos"),
  email: z.string().email("Correo electrónico no válido"),

  captcha: z.string().min(1,'recapcha requerido'),

  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(50, "La contraseña no puede superar los 50 caracteres")
    .regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
    .regex(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
    .regex(/[0-9]/, "La contraseña debe contener al menos un número")
    .regex(/[\W_]/, "La contraseña debe contener al menos un carácter especial"),
});

// Esquema para el inicio de sesión de usuarios
const loginSchema = z.object({
  email: z.string().email("Correo electrónico no válido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  captcha: z.string().min(1,'recapcha requerido')
});

module.exports = {
  registerSchema,
  loginSchema,
};