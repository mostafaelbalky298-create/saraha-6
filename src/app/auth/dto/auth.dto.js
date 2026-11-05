import {z} from 'zod'


export const registerDto = z.object({
  email: z.email().toLowerCase().trim(),
  name: z.string().min(2).max(20).trim(),
  password: z.string().min(8).max(16).trim(),
  dob: z.coerce.date().optional(),
  gender: z.enum(["male", "female"]).optional(),
});

export const loginDto = z.object({
  email: z.email().toLowerCase().trim(),
  password: z.string().min(8).max(16).trim(),
});

export const sendOtpDto = z.object({
  email: z.email().toLowerCase().trim(),
});

export const verifyAccountDto = z.object({
  email: z.email().toLowerCase().trim(),
  code: z.string().regex(/^\d{6}$/, "Code must be exactly 6 digits"),
});

export const resetPasswordDto = z.object({
  email: z.email().toLowerCase().trim(),
  code: z.string().regex(/^\d{6}$/, "Code must be exactly 6 digits"),
  newPassword: z.string().min(8).max(16).trim(),
});