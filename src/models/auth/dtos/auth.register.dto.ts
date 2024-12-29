import { z } from 'zod';

export const RegisterAuthSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  name: z.string().min(1, 'Name is required')
});

export type RegisterAuth = z.infer<typeof RegisterAuthSchema>;

export class RegisterAuthDto {
  static schema = RegisterAuthSchema;
}
