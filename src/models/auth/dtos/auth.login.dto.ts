import { z } from 'zod';

export const LoginAuthSchema = z.object({
  username: z.string().min(1, 'username is required'),
  password: z.string().min(1, 'password is required')
});

export type LoginAuth = z.infer<typeof LoginAuthSchema>;

export class LoginAuthDto {
  static schema = LoginAuthSchema;
}
